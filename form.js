/*Cette fontion permet de ne pas afficher directment 
*tous les messages du formulaire
*/
function desactiveMessage(){
   let lEmessage = document.querySelectorAll('.messageEntreeUtilisateurs');

   for(let i=0; i<lEmessage.length; i++){
      lEmessage[i].style.display = 'none';
   }
   

}


/*Cette fonction va récuperer la classe (.messageEntreeUtilisateurs) 
*qui correspond à une entrée de l'utilisateur
*/
function getMessgEntreUti(element){
   while(element = element.nextSibling){
      if(element.className === 'messageEntreeUtilisateurs'){
         return element;
      }
   }
      return false;
}

/*Mise en place des différentes fonctions 
*de vérification du formulaire
*/
let verifiEntree = {};

//Vérification si l'utilisateur à coché son genre
verifiEntree['sex'] = function(){
   let sexEntree = document.getElementsByName('sex');
   let leStyleDuMessag = getMessgEntreUti(sexEntree[1].parentNode).style;
   if(sexEntree[0].checked || sexEntree[1].checked){
      console.log(sexEntree.checked);
      leStyleDuMessag.display = 'none';
      
      return true;
      
   }else{
      leStyleDuMessag.display = 'inline-block';
      return false;
   }

};

/*Cette fonction vérifie à la fois l'entrée du nom et du frénom
*parce qu'ils ont les mêmes conditions. D'où l'appel à 'id
*/
verifiEntree['lastname'] = function(id){
   let nomOuPrenomEntree = document.getElementById(id);
   let leStyleDuMessag = getMessgEntreUti(nomOuPrenomEntree).style;

   if(nomOuPrenomEntree.value.length >= 2){
      nomOuPrenomEntree.className = 'correct';
      leStyleDuMessag.display = 'none';
      console.log(nomOuPrenomEntree.value)
      return true;
   }else{
      nomOuPrenomEntree.className = 'incorrect';
      leStyleDuMessag.display = 'inline-block';
      return false;
   }

};

//vérification du prénom. Même condition que le nom.
verifiEntree['firstname'] = verifiEntree['lastname'];

//Vérification de l'entrée dans input age
verifiEntree['lAge'] = function(){
   let aGeEntree = document.getElementById('lAge');
   let leStyleDuMessag = getMessgEntreUti(lAge).style;
   let laValueAge = parseInt(aGeEntree.value);

   if(!isNaN(laValueAge) && laValueAge >=5 && laValueAge <= 100){
      aGeEntree.className = 'correct';
      leStyleDuMessag.display = 'none';
      console.log(aGeEntree.value)
      return true;
   }else{
      aGeEntree.className = 'incorrect';
      leStyleDuMessag.display = 'inline-block';
      return false;
   }
};

//Vérification du pseudo
verifiEntree['lEpseudo'] = function(){
   let pseudoEntree = document.getElementById('lEpseudo');
   let leStyleDuMessag = getMessgEntreUti('lEpseudo').style;

   if(pseudoEntree.value.length >= 4){
      pseudoEntree.className = 'correct';
      leStyleDuMessag.display = 'none';
      console.log(pseudoEntree.value)
      return true;
   }else{
      pseudoEntree.className = 'incorrect';
      leStyleDuMessag.display = 'inline-block';
      return false;
   }

};

//Vérification du mot de passe
verifiEntree['lEmdp'] = function(){
   let mdpEntree = document.getElementById('lEmdp');
   let leStyleDuMessag = getMessgEntreUti('lEmdp').style;

   if(mdpEntree.value.length >= 8){
      mdpEntree.className = 'correct';
      leStyleDuMessag.display = 'none';
      return true;
   }else{
      mdpEntree.className = 'incorrect';
      leStyleDuMessag.display = 'inline-block';
      return false;
   }

};


//Vérifier si les deux mdp correspondent
verifiEntree['rEpeatMdp'] = function(){
   let mdpEntree = document.getElementById('lEmdp');
   let rptMdpEntree = document.getElementById('rEpeatMdp');
   let leStyleDuMessag = getMessgEntreUti('rEpeatMdp').style;

   if(rptMdpEntree.value == mdpEntree.value && rptMdpEntree.value != ''){
      rptMdpEntree.className = 'correct';
      leStyleDuMessag.display = 'none';
      return true;
   }else{
      rptMdpEntree.className = 'incorrect';
      leStyleDuMessag.display = 'inline-block';
      return false;
   } 
}

//Vérifier si l'utilisateur à bien choisi son pays de résidence
verifiEntree['country'] = function(){
   let lepaysChoisi = document.getElementById('country');
   let leStyleDuMessag = getMessgEntreUti('country');

   if(lepaysChoisi.options[selectedIndex].value != 'none'){
      leStyleDuMessag.display ='none';
      return true;
   }else{
      leStyleDuMessag.display = 'inline-block';
      return false;
   }


};

//Appel aux événements
(function(){
   let monForm = document.getElementById('lEform');
   let lEsInputs = document.getElementsByTagName('input');


   for(let i=0; i<lEsInputs.length; i++){
      if(lEsInputs[i].type == 'text' || lEsInputs[i].type == 'password'){
         lEsInputs[i].addEventListener('keyup', function(e){
            //Ce moceau représente l'input actuellement modifié (e.target.id)
            verifiEntree[e.target.id](e.target.id);
         }, false);
      }
   }

   //Envoi du formulaire
   monForm .addEventListener('submit', function(e){
      let resultat = true;
      for(let i in verifiEntree){
         resultat = verifiEntree[i](i) && resultat;
      }
      console.log('1'+ resultat)
      if(resultat){
         alert('Le formulaire à bien été rempli');
         console.log('2' + resultat);
      }
      e.preventDefault();

   }, false);

   //Reset des champs
   monForm.addEventListener('reset', function(){
      for(let i=0; i<lEsInputs.length; i++){
         if(lEsInputs[i].type == 'text' || lEsInputs[i].type == 'password'){
            lEsInputs[i].className ='';
         }
      }
      desactiveMessage();

   }, false);

})();
desactiveMessage();
