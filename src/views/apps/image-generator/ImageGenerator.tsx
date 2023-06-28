// import logo from './logo.svg';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function ImageGenerator(props: any) {
    const { imageParam } = props

    console.log(imageParam);

    const [inputText, setInputText] = React.useState<any>(null)
    const [numberOfImages, setNumberOfImages] = React.useState<any>()
    const [imageSize, setImageSize] = useState("256x256")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);


    const stylesData = [{
        id: 0,
        url: "https://gencraft.com/api_resources/images/art_styles/ic_style_cartoon.jpg",
        name: "Cartoon"
    },
    {
        id: 1,
        url: "https://gencraft.com/api_resources/images/art_styles/ic_style_oil_painting.jpg",
        name: "Oil painting"
    }, {
        id: 2,
        url: "https://gencraft.com/api_resources/images/art_styles/ic_style_floral.jpg",
        name: "Floral"
    },
    {
        id: 3,
        url: "https://gencraft.com/api_resources/images/art_styles/ic_style_valentines.jpg",
        name: "Valentine"
    }, {
        id: 4,
        url: "https://gencraft.com/api_resources/images/art_styles/ic_style_3d.jpg",
        name: "3D"
    }, {
        id: 5,
        url: "https://gencraft.com/api_resources/images/art_styles/ic_style_anime.jpg",
        name: "Anime"
    }, {
        id: 6,
        url: "https://gencraft.com/api_resources/images/art_styles/ic_style_ink.jpg",
        name: "Ink"
    }, {
        id: 7,
        url: "https://gencraft.com/api_resources/images/art_styles/ic_style_watercolor.jpg",
        name: "Watercolor"
    }, {
        id: 8,
        url: "https://gencraft.com/api_resources/images/art_styles/ic_style_abstract.jpg",
        name: "Abstract"
    }, {
        id: 9,
        url: "https://gencraft.com/api_resources/images/art_styles/ic_style_transparent.jpg",
        name: "Transparent"
    },
    {
        id: 10,
        url: "https://gencraft.com/api_resources/images/art_styles/ic_style_polaroid.jpg",
        name: "Polaroid"
    },




    ]

    const [img, setImg] = useState([])


    React.useEffect(() => {
        if (imageParam) {
            setLoading(true);
            setImg([])
            const headers = { 'Authorization': 'Bearer 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' };
            axios.post("https://api.openai.com/v1/images/generations", imageParam, { headers: headers }
            ).then((res) => {
                setLoading(false);
                console.log("Response", res);
                // console.log(img);
                setImg(res.data.data);

            }).catch((err) => {
                setLoading(false);
                setError("Error")
                console.log(err);
            })
        }
    }, [imageParam])

    return (
        <Box>
            <Box>
                {loading &&
                    <Box sx={{ display: 'flex', justifyContent: "center" }}>
                        <CircularProgress />
                    </Box>}
            </Box>
            <br />

            <Box>
                {img.map((res: any) => (
                    <img style={{ margin: "2px" }} src={res.url} />
                ))}
            </Box>
        </Box>
    );
}

export default ImageGenerator;
