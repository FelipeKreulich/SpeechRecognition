(function () {


  var speakBtn = document.querySelector('#speakbt');
  var resultSpeaker = document.querySelector('#resultSpeak');

  if (window.SpeechRecognition || window.webkitSpeechRecognition) {

      var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

      var myRecognition = new SpeechRecognition();

      myRecognition.lang = 'pt-BR';


      speakBtn.addEventListener('click', function () {

          try {

              myRecognition.start();

              resultSpeaker.innerHTML = "Estou te ouvindo!";

          } catch (erro) {
              alert('erro:' + erro.message);
          }

      }, false);

      myRecognition.addEventListener('result', function (evt) {

          var resultSpeak = evt.results[0][0].transcript;

          console.log(resultSpeak);

          resultSpeaker.innerHTML = resultSpeak;

          switch (resultSpeak.toLowerCase()) {
              case 'clarear':
                  document.body.style.backgroundColor = '#5885AF';
                  break;
              case 'escurecer':
                  document.body.style.backgroundColor = '#274472';
                  break;
              case 'randomizar':
                  function randomColor() {
                    const hex = (Math.random() * 0xFFFFFF << 0).toString(16);
                    return `#${hex}`;
                    }
                  document.body.style.backgroundColor = randomColor()
                  break;
          }

          if (resultSpeak.match(/buscar por/)) {

              resultSpeaker.innerHTML = 'Redirecionando...';

              setTimeout(function () {

                  var resultado = resultSpeak.split('buscar por');
                  window.location.href = 'https://www.google.com.br/search?q=' + resultado[1];

              }, 2000);
          }
      }, false);

      myRecognition.addEventListener('error', function (evt) {

          resultSpeaker.innerHTML = 'Se você disse alguma coisa, não ouvi muito bem!';

      }, false);

  } else {
      resultSpeaker.innerHTML = 'Seu navegador não suporta este tipo de tecnologia!';
  }

})();