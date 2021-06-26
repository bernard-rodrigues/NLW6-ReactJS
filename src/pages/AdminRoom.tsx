//import { FormEvent } from 'react';
//import { useState } from 'react';
import { useParams } from 'react-router';
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg'
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
//import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
//import { database } from '../services/firebase';

import '../styles/room.scss';
import { database } from '../services/firebase';
import { useHistory } from 'react-router-dom';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    //const { user } = useAuth();
    //Generic: é como se fosse um parâmetro que eu passo para a tipagem, para que essa função já saiba os parametros que essa rota vai receber
    const params = useParams<RoomParams>();
    //const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;

    const { title, questions } = useRoom(roomId)
    const history = useHistory()

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {/* if, then */}
                    {questions.length > 0 && <span>{questions.length} perguntas(s)</span>}
                </div>

                {/* map funciona como u for it, percorre cada um dos items, mas diferentemente, ele permite que eu retorne algo dele, não somente itere sobre o array */}
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                //é importante utilizar key para o React saber diferenciar uma pergunta da outra. Caso eu não utilize, quando um item for, por exemplo, deletado, o Firebase vai recriar todo o HTML da lista
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}