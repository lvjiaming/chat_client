
cc.dd = cc.dd || {}

cc.dd.pubConst = require('./Data/PubConst.js');
cc.dd.chatEventManager = require('./Event/ChatEventManager.js').getInstance();
cc.dd.chatEvent = require('./Event/ChatEventManager.js').Event;
require('./Data/RoomData.js');
cc.dd.basePb = require('./protoBuf/base_pb.js');


cc.dd.copy = require('copy-to');
cc.dd._ = require('lodash');