// NOTE : Import SVG Héxagone => FORME + BORDER (l'un sur l'autre dans StyleHexa.scss)
// NOTE : + IMAGE/Vidéo NFT à INTEGRER

import React, { FC } from 'react';
import './styleHexa.scss';
import ReactPlayer from 'react-player';
import notfoundNft from '../../../../assets/img/notfoundnft.png';
import { useState } from 'react';
import { useEffect } from 'react';

interface InterfaceHexFormSvgNft {
  format: 'video/mp4' | 'video/mp3';
  url: string;
  widthSvg: number;
  borderColor?: string;
}

const HexFormSvgNft: FC<InterfaceHexFormSvgNft> = ({
  widthSvg,
  format,
  url
}) => {
  // const content: JSX.Element;
  let content: JSX.Element;

  switch (format) {
    case 'video/mp4':
      // LINK : CONTENU : video
      content = (
        <div className='contenuVideo wrapHexaSvg'>
          <svg
            className='SvgContenu'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 196 169.74097914174996'
            width={widthSvg * 0.95 + 'px'}
          >
            <path
              fill={'url(#' + url + ')'}
              d='M5.000000000000001 93.53074360871936Q0 84.87048957087498 5.000000000000001 76.2102355330306L44 8.660254037844386Q49 0 59 0L137 0Q147 0 152 8.660254037844386L191 76.2102355330306Q196 84.87048957087498 191 93.53074360871936L152 161.08072510390556Q147 169.74097914174996 137 169.74097914174996L59 169.74097914174996Q49 169.74097914174996 44 161.08072510390556Z'
            ></path>

            <foreignObject width='100%' height='100%' className='hexVideo'>
              <div style={{ overflow: 'hidden' }}>
                <ReactPlayer
                  width={'100%'}
                  height={'100%'}
                  playing={true}
                  loop={true}
                  volume={0}
                  muted={true}
                  url={url}
                  playsInline={false}
                />
              </div>
            </foreignObject>
          </svg>
        </div>
      );
      break;

    default:
      // LINK : => image NFt
      content = (
        <div className='contenuImageDefault wrapHexaSvg'>
          {
            <svg
              className='SvgContenu'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 196 169.74097914174996'
              width={widthSvg * 0.95 + 'px'}
            >
              <path
                fill={'url(#' + url + ')'}
                d='M5.000000000000001 93.53074360871936Q0 84.87048957087498 5.000000000000001 76.2102355330306L44 8.660254037844386Q49 0 59 0L137 0Q147 0 152 8.660254037844386L191 76.2102355330306Q196 84.87048957087498 191 93.53074360871936L152 161.08072510390556Q147 169.74097914174996 137 169.74097914174996L59 169.74097914174996Q49 169.74097914174996 44 161.08072510390556Z'
              ></path>
              <foreignObject
                width='100%'
                height='100%'
                className='hexcontenuImageDefault'
              >
                <defs>
                  <pattern
                    id={url}
                    height='100%'
                    width='100%'
                    patternUnits='userSpaceOnUse'
                    x='0'
                    y='0'
                  >
                    <img
                      src={url ? url : notfoundNft}
                      alt='Image par défaut'
                      style={{ width: '100%', height: '100%' }}
                    />
                  </pattern>
                </defs>
              </foreignObject>
            </svg>
          }
        </div>
      );
      break;
  }

  // LINK :  DÉGRADÉ-GRADIENT
  return (
    <div className='wrapHexaSvg'>
      <svg
        className='svgBorder'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 196 169.74097914174996'
        style={{ filter: 'drop-shadow(rgba(0, 0, 0, 0.25) 5px 5px 5px)' }}
        height='100%'
        width={widthSvg + 'px'}
      >
        <defs>
          <linearGradient id='borderGradient' x1='0%' y1='100%' x2='0%' y2='0%'>
            <stop offset='0%' style={{ stopColor: 'rgba(189, 55, 236, 1)' }} />
            <stop
              offset='100%'
              style={{ stopColor: 'rgba(31, 103, 255, 1)' }}
              // NOTE : ## BORDURE dégradé : que string => donc on créer un ID ##
            />
          </linearGradient>
        </defs>

        <path
          fill='url(#borderGradient)'
          d='M5.000000000000001 93.53074360871936Q0 84.87048957087498 5.000000000000001 76.2102355330306L44 8.660254037844386Q49 0 59 0L137 0Q147 0 152 8.660254037844386L191 76.2102355330306Q196 84.87048957087498 191 93.53074360871936L152 161.08072510390556Q147 169.74097914174996 137 169.74097914174996L59 169.74097914174996Q49 169.74097914174996 44 161.08072510390556Z'
        ></path>
      </svg>
      <div className='contentImageVideoHexa'>
        {/* // LINK : Afficher le "content" Image/Video */}
        {content}
      </div>
    </div>
  );
};
export default HexFormSvgNft;

/* ====== TESTS ================ */

//==> A : if (!url) { //  switch (format) { // ===> (l'un ou l'autre qui marche)
// const HexFormSvgNft: FC<InterfaceHexFormSvgNft> = ({
//   widthSvg,
//   format,
//   url
// }) => {
//   // =========== CONTENU : DÉGRADÉ-GRADIENT =============
//   return (
//     <div className='wrapHexaSvg'>
//       <svg
//         className='svgBorder'
//         version='1.1'
//         xmlns='http://www.w3.org/2000/svg'
//         viewBox='0 0 196 169.74097914174996'
//         style={{ filter: 'drop-shadow(rgba(0, 0, 0, 0.25) 5px 5px 5px)' }} // 0.25 = cursseur de 1>0  => opacité ombre
//         height='100%'
//         width={widthSvg + 'px'}
//         // className={className}
//       >
//         <defs>
//           <linearGradient id='borderGradient' x1='0%' y1='100%' x2='0%' y2='0%'>
//             <stop offset='0%' style={{ stopColor: 'rgba(189, 55, 236, 1)' }} />
//             <stop
//               offset='100%'
//               style={{ stopColor: 'rgba(31, 103, 255, 1)' }}
//               // NOTE : ## BORDURE dégradé : que string => donc on créer un ID ##
//             />
//           </linearGradient>
//         </defs>

//         <path
//           fill='url(#borderGradient)'
//           d='M5.000000000000001 93.53074360871936Q0 84.87048957087498 5.000000000000001 76.2102355330306L44 8.660254037844386Q49 0 59 0L137 0Q147 0 152 8.660254037844386L191 76.2102355330306Q196 84.87048957087498 191 93.53074360871936L152 161.08072510390556Q147 169.74097914174996 137 169.74097914174996L59 169.74097914174996Q49 169.74097914174996 44 161.08072510390556Z'
//         ></path>
//       </svg>
//     </div>
//   );

//   // =========== CONTENU : image/vidéo =============
//   if (!url) {
//     // pas url => image par défaut
//     return (
//       <div>
//         <img src={notfoundNft} alt='image de la collection manquante' />
//       </div>
//     );

//     // CONTENU : video <=> image :
//     switch (format) {
//       // CONTENU : video
//       case 'video/mp4':
//         return (
//           <div>
//             <svg
//               className='SvgContenu'
//               version='1.1'
//               xmlns='http://www.w3.org/2000/svg'
//               viewBox='0 0 196 169.74097914174996'
//               width={widthSvg * 0.95 + 'px'}
//             >
//               <path
//                 fill={'url(#' + url + ')'}
//                 d='M5.000000000000001 93.53074360871936Q0 84.87048957087498 5.000000000000001 76.2102355330306L44 8.660254037844386Q49 0 59 0L137 0Q147 0 152 8.660254037844386L191 76.2102355330306Q196 84.87048957087498 191 93.53074360871936L152 161.08072510390556Q147 169.74097914174996 137 169.74097914174996L59 169.74097914174996Q49 169.74097914174996 44 161.08072510390556Z'
//               ></path>

//               <foreignObject width='100%' height='100%' className='hexVideo'>
//                 <div style={{ overflow: 'hidden' }}>
//                   <ReactPlayer
//                     width={'100%'}
//                     height={'100%'}
//                     playing={true}
//                     loop={true}
//                     volume={0}
//                     muted={true}
//                     url={url}
//                     playsInline={false}
//                   />
//                 </div>
//               </foreignObject>
//             </svg>
//           </div>
//         );

//       // CONTENU : image
//       default:
//         return (
//           <div>
//             <svg
//               className='SvgContenu'
//               version='1.1'
//               xmlns='http://www.w3.org/2000/svg'
//               viewBox='0 0 196 169.74097914174996'
//               width={widthSvg * 0.95 + 'px'}
//             >
//               <defs>
//                 <pattern
//                   id={url}
//                   height='100%'
//                   width='100%'
//                   patternUnits='userSpaceOnUse'
//                   x='0'
//                   y='0'
//                 >
//                   <image
//                     href={url}
//                     x='0'
//                     y='0'
//                     width='196px'
//                     height='169.74097914174996px'
//                     preserveAspectRatio='xMinYMin slice'
//                   />
//                 </pattern>
//               </defs>
//               <path
//                 fill={'url(#' + url + ')'}
//                 d='M5.000000000000001 93.53074360871936Q0 84.87048957087498 5.000000000000001 76.2102355330306L44 8.660254037844386Q49 0 59 0L137 0Q147 0 152 8.660254037844386L191 76.2102355330306Q196 84.87048957087498 191 93.53074360871936L152 161.08072510390556Q147 169.74097914174996 137 169.74097914174996L59 169.74097914174996Q49 169.74097914174996 44 161.08072510390556Z'
//               ></path>
//             </svg>
//           </div>
//         );
//     }
//   }
// };

/* -------------------------  */

//==> B : Url ?()
// const HexFormSvgNft: FC<InterfaceHexFormSvgNft> = ({
//   widthSvg,
//   format,
//   url
// }) => {
//   // =========== CONTENU : DÉGRADÉ-GRADIENT =============
//   return (
//     <div className='wrapHexaSvg'>
//       <svg
//         className='svgBorder'
//         version='1.1'
//         xmlns='http://www.w3.org/2000/svg'
//         viewBox='0 0 196 169.74097914174996'
//         style={{ filter: 'drop-shadow(rgba(0, 0, 0, 0.25) 5px 5px 5px)' }} // 0.25 = cursseur de 1>0  => opacité ombre
//         height='100%'
//         width={widthSvg + 'px'}
//         // className={className}
//       >
//         <defs>
//           <linearGradient id='borderGradient' x1='0%' y1='100%' x2='0%' y2='0%'>
//             <stop offset='0%' style={{ stopColor: 'rgba(189, 55, 236, 1)' }} />
//             <stop
//               offset='100%'
//               style={{ stopColor: 'rgba(31, 103, 255, 1)' }}
//               // NOTE : ## BORDURE dégradé : que string => donc on créer un ID ##
//             />
//           </linearGradient>
//         </defs>
//         <path
//           fill='url(#borderGradient)'
//           d='M5.000000000000001 93.53074360871936Q0 84.87048957087498 5.000000000000001 76.2102355330306L44 8.660254037844386Q49 0 59 0L137 0Q147 0 152 8.660254037844386L191 76.2102355330306Q196 84.87048957087498 191 93.53074360871936L152 161.08072510390556Q147 169.74097914174996 137 169.74097914174996L59 169.74097914174996Q49 169.74097914174996 44 161.08072510390556Z'
//         ></path>

//         {/* =========== CONTENU : image/vidéo ============= */}
//         {url ? (
//           // CONTENU : video
//           format === 'video/mp4' ? (
//             <div>
//               <svg
//                 className='SvgContenu'
//                 version='1.1'
//                 xmlns='http://www.w3.org/2000/svg'
//                 viewBox='0 0 196 169.74097914174996'
//                 width={widthSvg * 0.95 + 'px'}
//               >
//                 <path
//                   fill={'url(#' + url + ')'}
//                   d='M5.000000000000001 93.53074360871936Q0 84.87048957087498 5.000000000000001 76.2102355330306L44 8.660254037844386Q49 0 59 0L137 0Q147 0 152 8.660254037844386L191 76.2102355330306Q196 84.87048957087498 191 93.53074360871936L152 161.08072510390556Q147 169.74097914174996 137 169.74097914174996L59 169.74097914174996Q49 169.74097914174996 44 161.08072510390556Z'
//                 ></path>

//                 <foreignObject width='100%' height='100%' className='hexVideo'>
//                   <div style={{ overflow: 'hidden' }}>
//                     <ReactPlayer
//                       width={'100%'}
//                       height={'100%'}
//                       playing={true}
//                       loop={true}
//                       volume={0}
//                       muted={true}
//                       url={url}
//                       playsInline={false}
//                     />
//                   </div>
//                 </foreignObject>
//               </svg>
//             </div>
//           ) : (
//             // CONTENU : image
//             <div>
//               <svg
//                 className='SvgContenu'
//                 version='1.1'
//                 xmlns='http://www.w3.org/2000/svg'
//                 viewBox='0 0 196 169.74097914174996'
//                 width={widthSvg * 0.95 + 'px'}
//               >
//                 <defs>
//                   <pattern
//                     id={url}
//                     height='100%'
//                     width='100%'
//                     patternUnits='userSpaceOnUse'
//                     x='0'
//                     y='0'
//                   >
//                     <image
//                       href={url}
//                       x='0'
//                       y='0'
//                       width='196px'
//                       height='169.74097914174996px'
//                       preserveAspectRatio='xMinYMin slice'
//                     />
//                   </pattern>
//                 </defs>
//                 <path
//                   fill={'url(#' + url + ')'}
//                   d='M5.000000000000001 93.53074360871936Q0 84.87048957087498 5.000000000000001 76.2102355330306L44 8.660254037844386Q49 0 59 0L137 0Q147 0 152 8.660254037844386L191 76.2102355330306Q196 84.87048957087498 191 93.53074360871936L152 161.08072510390556Q147 169.74097914174996 137 169.74097914174996L59 169.74097914174996Q49 169.74097914174996 44 161.08072510390556Z'
//                 ></path>
//               </svg>
//             </div>
//           )
//         ) : (
//           // pas url => image par défaut
//           <div>
//             <img src={notfoundNft} alt='image de la collection manquante' />
//           </div>
//         )}
//       </svg>
//     </div>
//   );
// };

/* -------------------------  */

//==> C : let content
// const HexFormSvgNft: FC<InterfaceHexFormSvgNft> = ({
//   widthSvg,
//   format,
//   url
// }) => {
//   const [content, setContent] = useState<JSX.Element | null>(null);

//   useEffect(() => {
//     let contentToDisplay: JSX.Element;

//     if (url) {
//       if (format === 'video/mp4') {
//         contentToDisplay = (
//           <ReactPlayer
//             width='100%'
//             height='100%'
//             playing={true}
//             loop={true}
//             volume={0}
//             muted={true}
//             url={url}
//             playsInline={false}
//           />
//         );
//       } else {
//         contentToDisplay = (
//           <img
//             src={url}
//             alt='Image'
//             style={{ width: '100%', height: '100%' }}
//           />
//         );
//       }
//     } else {
//       contentToDisplay = (
//         <img
//           src={notfoundNft}
//           alt='Image par défaut'
//           style={{ width: '100%', height: '100%' }}
//         />
//       );
//     }

//     setContent(contentToDisplay);
//   }, [format, url]);

//   return (
//     <div className='wrapHexaSvg'>
//       <svg
//         className='svgBorder'
//         version='1.1'
//         xmlns='http://www.w3.org/2000/svg'
//         viewBox='0 0 196 169.74097914174996'
//         style={{ filter: 'drop-shadow(rgba(0, 0, 0, 0.25) 5px 5px 5px)' }}
//         height='100%'
//         width={widthSvg + 'px'}
//       >
//         <defs>
//           <linearGradient id='borderGradient' x1='0%' y1='100%' x2='0%' y2='0%'>
//             <stop offset='0%' style={{ stopColor: 'rgba(189, 55, 236, 1)' }} />
//             <stop
//               offset='100%'
//               style={{ stopColor: 'rgba(31, 103, 255, 1)' }}
//             />
//           </linearGradient>
//         </defs>
//         <path
//           fill='url(#borderGradient)'
//           d='M5.000000000000001 93.53074360871936Q0 84.87048957087498 5.000000000000001 76.2102355330306L44 8.660254037844386Q49 0 59 0L137 0Q147 0 152 8.660254037844386L191 76.2102355330306Q196 84.87048957087498 191 93.53074360871936L152 161.08072510390556Q147 169.74097914174996 137 169.74097914174996L59 169.74097914174996Q49 169.74097914174996 44 161.08072510390556Z'
//         ></path>

//         <foreignObject width='100%' height='100%'>
//           {content}
//         </foreignObject>
//       </svg>
//     </div>
//   );
// };

/* -------------------------  */
