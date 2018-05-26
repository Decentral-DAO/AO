const utils = require('./spec/utils')
const events = require('./events')
const cryptoUtils = require('../crypto')
const state = require('./state')

const getIdSecret = function(identifier){
    let ownerId, secret
    state.serverState.members.forEach( member => {
        if (member.name === identifier || member.memberId === identifier){
            ownerId = member.memberId
            secret = member.secret
        }
    })

    state.serverState.resources.forEach( resource => {
        if (resource.name === identifier || resource.resourceId === identifier) {
            ownerId = resource.resourceId
            secret = resource.secret
        }
    })

    return {ownerId, secret}
}
// Used in socketio-auth creation, checks token (https://www.npmjs.com/package/socketio-auth)
function socketAuth(socket, data, callback){
    let authorized
    state.serverState.sessions.forEach(session => {
        if (session.token === data.token){
            authorized = true
        }
    })
    callback(null, authorized)
}

// express middleware auth
function serverAuth(req, res, next){
    // a session is a random uuid created client side
    // if these headers are present {session, authorization, name} the client is attempting to create a new session
    const {ownerId, secret} = getIdSecret(req.headers.name)

    if (secret && req.headers.authorization && req.headers.session){
        let sessionKey = cryptoUtils.createHash(req.headers.session + secret)
        let token = cryptoUtils.hmacHex(req.headers.session, sessionKey)
        if (token === req.headers.authorization){
            // client able to create the token, must have secret
            events.sessionsEvs.sessionCreated(ownerId, req.headers.session, token, utils.buildResCallback(res))
        } else {
            console.log('unauthorized attempt')
            res.status(401).end('unauthorized')
        }
    } else {
        // otherwise we validate there authorization token in the header
        let authorized = false
        state.serverState.sessions.forEach(session => {
            if (session.token === req.headers.authorization){
                authorized = true
            }
        })
        if (authorized){
            console.log('authorized!')
            next()
        } else {
            console.log('unauthorized')
            res.status(401).end('unauthorized')
        }
    }
}

module.exports = {
    socketAuth,
    serverAuth
}
