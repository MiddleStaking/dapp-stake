import React, { FC, CSSProperties } from 'react';
import Button from '.';

const ButtonGroupe: FC = () => {
  const ButtonGroupeStyle: CSSProperties = {
    boxSizing: 'border-box',
    position: 'relative',
    width: '173px',
    // height: '375px',
    background: '#151515',
    border: '1px dashed #9747FF',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column' // Ajouté pour centrer verticalement les boutons
  };

  const buttonMargin: CSSProperties = {
    marginBottom: '10px' // Ajouté pour ajouter un espacement entre les boutons
  };

  const firstebuttonMargin: CSSProperties = {
    marginBottom: '10px',
    marginTop: '10px' // Ajouté pour ajouter un espacement entre les boutons
  };

  return (
    <div style={ButtonGroupeStyle}>
      <div style={firstebuttonMargin}>
        <Button
          borderRadius={40}
          background={'#000000'}
          borderColor={'black'}
          text='Stake'
          onClick={() => console.log('Bouton cliqué')}
        />
      </div>

      <div style={buttonMargin}>
        <Button
          borderWidth={'1px'}
          borderRadius={40}
          background={'black'}
          borderColor={['#BD37EC', '#1F67FF']}
          text='Stake'
          hasBorder={true}
          onClick={() => console.log('Bouton cliqué')}
        />
      </div>

      <div style={buttonMargin}>
        <Button
          borderRadius={40}
          background={['#BD37EC', '#1F67FF']}
          borderColor={'black'}
          text='Stake'
          onClick={() => console.log('Bouton cliqué')}
        />
      </div>

      <div style={buttonMargin}>
        <Button
          borderWidth={'1px'}
          borderRadius={40}
          background={'black'}
          borderColor={['#BD37EC', '#1F67FF']}
          text='Stake'
          hasBorder={true}
          buttonHeight='50px'
          onClick={() => console.log('Bouton cliqué')}
        />
      </div>

      <div style={buttonMargin}>
        <Button
          borderRadius={40}
          buttonHeight='50px'
          background={['#BD37EC', '#1F67FF']}
          borderColor={'black'}
          text='Stake'
          onClick={() => console.log('Bouton cliqué')}
          textColor='red'
        />
      </div>
      <div style={buttonMargin}>
        <Button
          borderRadius={40}
          background={['#BD37EC', '#1F67FF']}
          borderColor={'grey'}
          text='Stake'
          disabled={true}
          grayscale={'50%'}
          onClick={() => console.log('Bouton cliqué')}
        />
      </div>

      <div style={buttonMargin}>
        <Button
          borderWidth={'1px'}
          borderRadius={40}
          background={'black'}
          borderColor={['#BD37EC', '#1F67FF']}
          text='Stake'
          disabled={true}
          grayscale={'70%'}
          hasBorder={true}
          onClick={() => console.log('Bouton cliqué')}
        />
      </div>
    </div>
  );
};

export default ButtonGroupe;
