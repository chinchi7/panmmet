document.addEventListener('DOMContentLoaded',function(){const body=document.body;
  const gameSelectionDiv=document.createElement('div')
  gameSelectionDiv.style.display='flex';
  gameSelectionDiv.style.flexDirection='column';
  gameSelectionDiv.style.justifyContent='center';
  gameSelectionDiv.style.alignItems='center';
  gameSelectionDiv.style.height='0vh';
  const title=document.createElement('h1');
  title.textContent='ゲームを選んでください';
  gameSelectionDiv.appendChild(title);
  const gameButton1=document.createElement('button');
  gameButton1.textContent='ゲーム1をプレイ';
  styleGameButton(gameButton1)
  gameButton1.addEventListener('click',()=>{showModal('ゲーム１の説明：概要','./nekkoro.html','./image/スクリーンショット 2024-10-15 120401.png');});
  gameSelectionDiv.appendChild(gameButton1);
  const gameButton2=document.createElement('button');
  gameButton2.textContent='ゲーム２をプレイ';
  styleGameButton(gameButton2);
  gameButton2.addEventListener('click',()=>{showModal('ゲーム２の説明：概要','./sunaipu.html','./image/スクリーンショット 2024-06-20 220154.png');});
  gameSelectionDiv.appendChild(gameButton2);
  body.appendChild(gameSelectionDiv);
  function startGame(game){
    gameSelectionDiv.style.display='none';
    gameContainer.style.display='block';
    if(game==='game1'){loadScript('./nekkoro.js');}
    else if(game==='game2'){loadScript('./sunaipu.js');}
  }
  function styleGameButton(button){
    button.style.margin='20px';
    button.style.padding='15px 30px';
    button.style.fontSize='20px';
    button.style.cursor='pointer';
    button.style.backgroundColor='#4CAF50';
    button.style.color='white';
    button.style.border='none';
    button.style.borderRadius='5px';
    button.style.height='80px';
    button.addEventListener('mouseover',()=>{button.style.backgroundColor='#45a049';});
    button.addEventListener('mouseout',()=>{button.style.backgroundColor='#4CAF50';});
  }
  const modal=document.createElement('div');
  modal.style.display='none';
  modal.style.position='fixed';
  modal.style.left='0';
  modal.style.top='0';
  modal.style.width='100%';
  modal.style.height='100%';
  modal.style.backgroundColor='rgba(0,0,0,0.5)';
  modal.style.justifyContent='center';
  modal.style.alignItems='center';
  const modalContent=document.createElement('div');
  modalContent.style.backgroundColor='white';
  modal.style.transform='translate(-50%,-50%)';
  modal.style.left='50%';
  modal.style.top='50%';
  modalContent.style.padding='20px';
  modalContent.style.width='60%';
  modalContent.style.textAlign='center';
  modalContent.style.borderRadius='5px';
  const modalText=document.createElement('p');
  modalContent.appendChild(modalText);
  const modalImage=document.createElement('img');
  modalImage.style.maxWidth='70%';
  modalImage.style.margin='auto';
  modalImage.style.borderRadius='5px';
  modalImage.style.display='block'
  modalContent.appendChild(modalImage);
  const closeBUtton=document.createElement('button');
  closeBUtton.textContent='やめる';
  styleGameButton(closeBUtton);
  closeBUtton.addEventListener('click',()=>{modal.style.display='none';});
  modalContent.appendChild(closeBUtton);
  const startButton=document.createElement('button');
  startButton.textContent='ゲームを始める';
  styleGameButton(startButton);
  startButton.addEventListener('click',()=>{
    window.location.href=startButton.getAttribute('data-href');
  });
  modalContent.appendChild(startButton);
  modal.appendChild(modalContent);
  body.appendChild(modal);
  function showModal(description,href,imgSrc){modalText.textContent=description;
    startButton.setAttribute('data-href',href);
    modalImage.src=imgSrc;
    modal.style.display='flex';
  }

});
