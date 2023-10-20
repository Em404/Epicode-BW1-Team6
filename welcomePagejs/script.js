

function cloneWelcomePage(){

    // Seleziona il modello
    const template = document.getElementsByTagName("template")[0].content;

    // Clona il contenuto del modello
    const clone = template.cloneNode(true);

    // Aggiungi il clone al contenitore desiderato
    const cloneContainer = document.getElementById("clone-Welcome-Page");
    cloneContainer.appendChild(clone);

    initCheckbox()
  }


  cloneWelcomePage();

  function initCheckbox() {   
      
      let checkbox = document.getElementById('check-welcome-page');
      let button = document.getElementById('btnWelcomePage')
      
      checkbox.addEventListener('click', function () {
          if (checkbox.checked) {
              button.removeAttribute('disabled')
            }else{
                button.disabled = 'true'
            }
        })
    }
        