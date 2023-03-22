# Peel : Exfolie tes rencontres

## contexte :

 Dans mon cercle d’amis, beaucoup d’entre eux me disent qu’ils n’osent pas utiliser de site de rencontre. Lorsque je leur demande pourquoi, ils me répondent que les sites de rencontre sont trop superficiels et qu’ils cherchent « Le grand amour ». C’est avec ce problème en tête que j’ai trouvé une solution. L’application Peel a pour ambition de permettre à tous les utilisateurs de discuter entre eux sans se soucier du côté superficiel des sites de rencontre. Le site est inspiré de Tinder dans son fonctionnement mais sans photos d’utilisateurs. L’idée est d’avoir une alternative à Tinder plus orienté sur le caractère des personnes, chose qu’on ne trouve pas ou peu sur les applications de rencontre. 

## Fonctionnement de l’application :

L’utilisateur peut créer un compte. Il indique son nom, son prénom, son courriel, son mot de passe, sa date de naissance, son sexe et sa photo. Ensuite il indique ses préférences (localisation, Age, préférence sexuelle). Par la suite l’utilisateur doit remplir son profil, il rentre une biographie, choisit ses centres d’intérêt depuis une liste définie et choisit de répondre à 3 questions parmi une liste de questions définies.

Viens par la suite la sélection de profil : Un profil est affiché, l’utilisateur peut voir sa biographie, ses centres d’intérêt et les questions auquel l’utilisateur a répondu. Comme sur Tinder il peut choisir de liker ou non un profil.

Les profils seront affichés en fonction des préférences de l’utilisateur, mais aussi de ses centres d’intérêt et des profils qu’il a précédemment sélectionnés. Si l’utilisateur like un profil, ce profil auras plus de chance d’apparaitre sur l’algorithme de l’autre utilisateur. Si deux utilisateurs se sont mutuellement likés, alors il y a un match. Ils peuvent alors communiquer via une page de messagerie. Au bout d’un certain nombre de messages échangés l’application propose aux utilisateurs de d’échanger leurs photos. Ensuite les utilisateurs sont libres de continuer à communiquer ou non.

## lancer l'api avec docker : 
docker pull damiendrz/peel_api:latest
docker run -d -p 3001:3001 damiendrz/peel_api:latest

## lien de l'api hébergée : 
20.13.115.10:3001

## Lancer l'aplication : 

### L'application est pour l'instant uniquement utilisable sur Android

### Sur Android : 
npm run install-android 
npm run start 
npm run android


### Sur IOS : 
npm run install-ios 
npm run start 
npm run ios



## Compte a utiliser pour les messages
user : damien@test.com
password : testtest

## évaluation 1
### Fait
- Register 
- Login 
- router
- Modification de compte 
- swipe des profils 
- logout

## évaluation 2
### Fait
- composants 
- Styled component
- Routes protégées
- écran de chargement
- localisation + map
- Axios Interceptor
- swipe fin 
- finir pages inscription
- ajouter flash messages pour erreurs dans axios interceptor
- web sockets 
- Traduction (I18N)
- Messagerie (flatlist) 
- fonction async storage, socket et call api dans des fichiers externe 
- Home swipe button 
- conditions de validation des input du profil
- Mise a niveau es6
- Notifications notifee quand l'utilisateur reçoit un message
- navbar icon
- Design
- Héberger API







### A faire

- IOS
- Notifications Push
- Police de texte
- Contact Design
- Chat Design
- Pubs Admob - La création de compte admob de fonctionne pas.



Cleaner code :
    - sockets
    - component navbaricon




