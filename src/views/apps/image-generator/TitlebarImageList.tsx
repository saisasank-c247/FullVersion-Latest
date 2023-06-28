import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';

export default function TitlebarImageList(props:any) {

  const [activeImg, SetActiveImg] = React.useState('')
  const selectedImg = (val: string) => {
    console.log(val);
    SetActiveImg(val)
  }
props.themeClick(activeImg)
  return (
    <ImageList >
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Select Style</ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <>{<ImageListItem key={item.url} sx={{ border: item.name == activeImg ? `3px solid blue` : '3px solid red-' }}>
          <img
            onClick={() => selectedImg(item.name)}
            src={`${item.url}`}
            srcSet={`${item.url}`}
            alt={item.name}
            loading="lazy" />
          <ImageListItemBar
            title={item.name} />
        </ImageListItem>
          // : <ImageListItem key={item.url} sx={{ border: `3px solid red` }}>
          //   <img
          //     onClick={() => selectedImg(item.name)}
          //     src={`${item.url}`}
          //     srcSet={`${item.url}`}
          //     alt={item.name}
          //     loading="lazy" />
          //   <ImageListItemBar
          //     title={item.name} />
          // </ImageListItem>
        }
        </>
      ))}
    </ImageList>
  );
}

const itemData = [{
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