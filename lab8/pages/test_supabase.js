import {supabase} from './supabase'

export default function Home({clients}){
    console.log({clients});
    return (
        <div> 
            {clients.map((lesson)=>(
                <p key={lesson.id}>{lesson.firstname}</p>
            ))}
        </div>
    );
}


export const getStaticProps = async () =>  {
    const {data : clients} = await supabase.from("contacts").select("*")

    return {
        props : {
            clients,
        },
    };
};