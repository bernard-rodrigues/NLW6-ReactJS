import { useEffect } from "react";
import { useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionType = {
    id: string,
    author: {
        name: string,
        avatar: string,
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean,
    likeCount: number,
    likeId: string | undefined
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean
    likes: Record<string, {
        authorId: string;
    }>
}>

export function useRoom(roomId: string) {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('');

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
                    likeCount: Object.values(value.likes ?? {}).length,

                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
                }
            })

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
        //remove todos os event listeners
        return () => {
            roomRef.off('value');
        }
        //roomId e user.id são as variáveis que o useEffect vai monitorar
    }, [roomId, user?.id])

    return { questions, title }
}