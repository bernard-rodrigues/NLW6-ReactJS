import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomParams = {
    id: string;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean
}>

type Question = {
    id: string,
    author: {
        name: string,
        avatar: string,
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean
}

export function Room() {
    const { user } = useAuth();
    //Generic: é como se fosse um parâmetro que eu passo para a tipagem, para que essa função já saiba os parametros que essa rota vai receber
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('');

    const roomId = params.id;

    //um hook que eu chamo dentro do componente que dispara um evento sempre que alguma informação mudar. Se eu passar esse array de dependências (as funções que eu quero monitorar) vazio, essa função irá executar apenas uma vez assim que esse componente for exibido em tela
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        //se eu quero ouvir o evento mais de uma vez, eu utilizo .on() ao invés de .once()

        //monitorar o value pode fazer a aplicação ficar lenta, pois dependendo do número de perguntas, esse monitoramento pode recarregar um número muito extenso de informações.
        // Na documentação do Firebase eu consigo encontrar outras formas de monitoramento, como Child Added (sempre que entra nova informação), Child Removed (quando informação é removida), Child Moved (quando transferida), etc. Pequisar. O Firebase é meio ruim nesse aspecto. Tem que criar umas regras.
        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            //Object.entries retorna um array de arrays de duas posições ['nomeDoParametro', 'conteudoDoParametro'] cada.
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            })

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
        //roomId é a variável que o useEffect vai monitorar
    }, [roomId])

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }
        if (!user) {
            throw new Error('You must be logged in');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId} />
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {/* if, then */}
                    {questions.length > 0 && <span>{questions.length} perguntas(s)</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    )
}