import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./../firebase";
import { Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography} from "@mui/material";


function MoreVertIcon() {
    return null;
}

const Dot = ({ post }) => {


    return (
        <Card sx={{ maxWidth: 800,  backgroundColor:'#cad3b1'  }}>

            <CardHeader
                title={post.titre }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                sx={{  }}
            />

            <hr />
            {post.important ? <h1>IMPORTANT</h1> : <> </> }
            { post.image  ? <CardMedia
                component="img"
                height="194"
                image={post.image}
                alt={'url:' + post.image}
            />  : <> </>  }


            <CardContent>
                <Typography  variant="body2" color="text.secondary">
                    {post.message}
                </Typography>
            </CardContent>
        </Card>
    )

};

export default function Posts() {

    //info du post :
    // -> date
    // -> auteur
    // -> titre
    // -> message ?
    // -> image ?
    // -> imporant ?

    const [colors, setColors] = useState([]);


    useEffect(() => {
        console.log('recuperation des posts');
        const collectionRef = collection(db, "post");
        const q = query(collectionRef, orderBy("date", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setColors(snapshot.docs.map((doc) => ({ ...doc.data() , id: doc.id }))
            ));


        return unsub;
    }, []);


    return (
        <Box   sx={{  alignItems: 'center'  }}>

            {colors.map((post) => (

                <div key={post.id}  style={{
                    marginTop:10,

                }} >
                    <Dot post={post}   />
                </div>
            ))}
        </Box >

    );
}