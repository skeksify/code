/**
 * Created by Skeksify on 09/07/2016.
 */

define([
    "underscore",
    "jquery",
    "scripts/libs/app/enemyList.js"
], function (_, $, enemiesById) {
    
    $.p = function (func, context, params) {
        return params ? func.bind(context, params) : func.bind(context);
    }
    
    $.pAr = function (func, context, params) {
        return params ? func.bind.apply(func, [context].concat(params)) : func.bind(context);
    }

    $.isAr = function (possibleArray) { return possibleArray && possibleArray.constructor === Array; }
    $.isSt = function (possibleString) { return _.isString(possibleString) }
    $.isFu = function (possibleFunction) { return _.isFunction(possibleFunction) }

    return {
        rand: function (a, b) {
            var rndVal = Math.random(),
                result;
            
            if (a && b) {
                result = parseInt((b-a)*rndVal)+a;
            } else if (a) {
                result = parseInt(a*rndVal);                
            } else {
                result = rndVal;
            }
            
            return result;
        },
        
        addToBody: function (markup) {
            $("body")
                .append("<br/>")
                .append(markup)
        },

        getEnemyById: function (enemy_id) {
            return enemiesById[enemy_id]
        },

        getRandomEnemy: function () {
            var keys = Object.keys(enemiesById);

            return enemiesById[keys[parseInt(Math.random()*keys.length)]];
        }
    };
});