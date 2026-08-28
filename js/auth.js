
function getCFAUsers(){
  try{
    return JSON.parse(localStorage.getItem("cfa_users") || "[]");
  }catch(e){
    return [];
  }
}

function saveCFAUsers(users){
  localStorage.setItem("cfa_users", JSON.stringify(users));
}

function authMessage(text,type){
  const box=document.getElementById("authMessage");
  if(!box)return;
  box.textContent=text;
  box.className="auth-message "+type;
}

document.addEventListener("DOMContentLoaded",function(){

  const signup=document.getElementById("signupForm");

  if(signup){
    signup.addEventListener("submit",function(e){
      e.preventDefault();

      const name=document.getElementById("name").value.trim();
      const email=document.getElementById("email").value.trim().toLowerCase();
      const password=document.getElementById("password").value;
      const confirm=document.getElementById("confirmPassword").value;

      if(!name || !email || !password || !confirm){
        authMessage("Veuillez remplir tous les champs.","error");
        return;
      }

      if(password.length<6){
        authMessage("Le mot de passe doit contenir au moins 6 caractères.","error");
        return;
      }

      if(password!==confirm){
        authMessage("Les mots de passe ne correspondent pas.","error");
        return;
      }

      const users=getCFAUsers();

      if(users.some(u=>u.email===email)){
        authMessage("Un compte avec cet e-mail existe déjà.","error");
        return;
      }

      users.push({
        name:name,
        email:email,
        password:password
      });

      saveCFAUsers(users);

      localStorage.setItem("cfa_current_user",JSON.stringify({
        name:name,
        email:email
      }));

      authMessage("Compte créé avec succès !","success");

      setTimeout(function(){
        window.location.href="../index.html";
      },900);
    });
  }

  const login=document.getElementById("loginForm");

  if(login){
    login.addEventListener("submit",function(e){
      e.preventDefault();

      const email=document.getElementById("email").value.trim().toLowerCase();
      const password=document.getElementById("password").value;

      const users=getCFAUsers();

      const user=users.find(
        u=>u.email===email && u.password===password
      );

      if(!user){
        authMessage("E-mail ou mot de passe incorrect.","error");
        return;
      }

      localStorage.setItem("cfa_current_user",JSON.stringify({
        name:user.name,
        email:user.email
      }));

      authMessage("Connexion réussie !","success");

      setTimeout(function(){
        window.location.href="../index.html";
      },700);
    });
  }

  const area=document.getElementById("accountArea");
  const current=localStorage.getItem("cfa_current_user");

  if(area && current){
    try{
      const user=JSON.parse(current);

      area.innerHTML=
        '<span class="user-welcome">Bonjour, '+user.name+'</span>'+
        '<button class="logout-btn" id="logoutBtn">Déconnexion</button>';

      document.getElementById("logoutBtn").onclick=function(){
        localStorage.removeItem("cfa_current_user");
        window.location.reload();
      };
    }catch(e){}
  }
});
