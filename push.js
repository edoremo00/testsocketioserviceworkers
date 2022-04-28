let push=require('web-push')
//let keys= push.generateVAPIDKeys()
//console.log(keys)

let vapidKeys={
    publicKey: 'BPgZmAUaE3mwCZbv5rd7zauE3B-ZZZVMD2e-_vbpaGMNbbnKkPI1d-rKRWUe1v-9J3M31gDnPARbq5a2AOrTAfE',
    privateKey: 'D9kbMdaVdToy1uJf7mqRlKc0u7X4dvH8vnLQrE2bYVE'
  }

  push.setVapidDetails('mailto:prova@prova.com',vapidKeys.publicKey,vapidKeys.privateKey)

  let sub={}//sono gli utenti che vogliono ricevere le notifiche
  push.sendNotification(sub,'prova notifiche')