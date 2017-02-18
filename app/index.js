/**
 * Created by User on 2/15/2017.
 */
'use strict';
require('./auth')();
module.exports = {
    router : require('./routes')(),
    session: require('./session')
}