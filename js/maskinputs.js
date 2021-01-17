const masksPattern = {
   "CELLPHONE": "(99) 99999-9999",
   "TELEPHONE": "(99) 9999-9999",
   "CPF": "999.999.999-999", 
   "CNPJ": "99.999.999/9999-99",
}

var data_mask_name = document.querySelector("[data-mask-name]");
var data_mask_phone = document.querySelector("[data-mask-phone]");
var data_mask_email = document.querySelector("[data-mask-email]");
var data_mask_document = document.querySelector("[data-mask-document]");

data_mask_phone
   .addEventListener('input', (e) => handlerMask([masksPattern.CELLPHONE, masksPattern.TELEPHONE], 14, e), false);

data_mask_document
   .addEventListener('input', (e) => handlerMask([masksPattern.CNPJ, masksPattern.CPF], 14, e), false);

data_mask_name.addEventListener('change', (e) => handleMaskName(e), false);


function handlerMask(pattern, max, event) {
   let input = event.target;
   let value = input.value.replace(/\D/g, '');
   let mask  = (input.value.length > max ? pattern[0] : pattern[1]);

   VMasker(input).unMask();
   VMasker(input).maskPattern(mask);
   VMasker.toPattern(value, mask);
}


function handleMaskName(event) {
   let correct = event.target.value.toLowerCase().split(" ").map(function (word) {
     
     const isNotPreposition = function(word) {
       const prepositions = ['da', 'de', 'do', 'dos'];
       return ( prepositions.indexOf(word) === -1 && word.length > 1 );
     }; 

     if(isNotPreposition(word)) {
         return word.charAt(0).toUpperCase().trim() + word.slice(1);
      }
      return word.trim();
   });
   
   let newName = correct.join(' ').replace(/[0-9]/g, '');
   event.target.value = newName;
   return newName;
}