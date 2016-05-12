(function ($) {
    'use strict';

    $.fn.CueDateSelector = function (opts) {
        if (Object.prototype.toString.call(opts) == '[object String]') {
            if (opts == 'get') {
                var ret = [];
                $(this).find('.date-item div.active').each(function (i, elem) {
                    var type = $(this).closest('div.date-item').attr('date-type');
                    ret.push(dateText2Number(type));
                });
                return ret;
            }
        }
        
        return this.each(function (i, elem) {
            var $wrapper = $(elem);
            if ($wrapper.data('isInit')) {
                
            } else {
                init(elem);
            }
        });
    };

    $(document).ready(function () {
        init();
    });

    function init(elems) {
        var $collection;
        if (elems) {
            $collection = $(elems);
        } else {
            $collection =  $('[cue-date-selector]');
        }
        
        $collection.each(function (i, elem) {
            var isInit = $(this).data('isInit');
            if (!isInit) {
                //  date-item
                var $wrapper = $('<div class="cue-date-selector wrapper">');
                var $sunday = $('<div class="cue-date-selector date-item sunday" date-type="sunday">');
                var $monday = $('<div class="cue-date-selector date-item monday" date-type="monday">');
                var $tuesday = $('<div class="cue-date-selector date-item tuesday" date-type="tuesday">');
                var $wednesday = $('<div class="cue-date-selector date-item wednesday" date-type="wednesday">');
                var $thursday = $('<div class="cue-date-selector date-item thursday" date-type="thursday">');
                var $friday = $('<div class="cue-date-selector date-item friday" date-type="friday">');
                var $saturday = $('<div class="cue-date-selector date-item saturday" date-type="saturday">');
                $sunday.append('<span><div>' + 'S' + '</div></span>');
                $monday.append('<span><div>' + 'M' + '</div></span>');
                $tuesday.append('<span><div>' + 'T' + '</div></span>');
                $wednesday.append('<span><div>' + 'W' + '</div></span>');
                $thursday.append('<span><div>' + 'T' + '</div></span>');
                $friday.append('<span><div>' + 'F' + '</div></span>');
                $saturday.append('<span><div>' + 'S' + '</div></span>');
                $wrapper.append($sunday).append($monday).append($tuesday).append($tuesday).append($wednesday).append($thursday).append($friday).append($saturday);
                
                //  dur-date-item
                var $durDateEvenyDay = $('<div class="cue-date-selector dur-date-item everyday" data-type="everyday">');
                var $durDateWeekDays = $('<div class="cue-date-selector dur-date-item weekdays" data-type="weekdays">');
                var $durDateWeekEnd = $('<div class="cue-date-selector dur-date-item weekend" data-type="weekend">');
                $durDateEvenyDay.append('<span><div>' + 'EVERYDAY' + '</div></span>');
                $durDateWeekDays.append('<span><div>' + 'WEEKDAYS' + '</div></span>');
                $durDateWeekEnd.append('<span><div>' + 'WEEKEND' + '</div></span>');
                $wrapper.append($durDateEvenyDay).append($durDateWeekDays).append($durDateWeekEnd);
                $(this).data('isInit', true).append($wrapper);
        
                
                var $everydays = $('.monday, .tuesday, .wednesday, .thursday, .friday, .saturday, .sunday', $wrapper);
                var $weekdays = $('.monday, .tuesday, .wednesday, .thursday, .friday', $wrapper);
                var $weekends = $('.saturday, .sunday', $wrapper);
                $everydays.each(function (i, evenyday) {
                    var $ed = $(evenyday);
                    var $s = $ed.find('span');
                    var $d = $ed.find('div');
                    $s.on('click', function (ev) {
                        var isActive = $d.hasClass('active');
                        if (isActive) {
                            $d.removeClass('active');
                        } else {
                            $d.addClass('active');
                        }
                        var $actives = $everydays.find('div.active');
                        if ($actives.size() == 7) {
                            $('.dur-date-item.everyday div', $wrapper).addClass('active');
                            $('.dur-date-item.weekdays div', $wrapper).removeClass('active');
                            $('.dur-date-item.weekend div', $wrapper).removeClass('active');
                        } else if (($weekdays.has('div.active').size() == 5) && $weekends.has('div.active').size() == 0) {
                            $('.dur-date-item.weekdays div', $wrapper).addClass('active');
                            $('.dur-date-item.everyday div', $wrapper).removeClass('active');
                            $('.dur-date-item.weekend div', $wrapper).removeClass('active');
                        } else if (($weekends.has('div.active').size() == 2) && ($weekdays.has('div.active').size() == 0)) {
                            $('.dur-date-item.weekend div', $wrapper).addClass('active');
                            $('.dur-date-item.everyday div', $wrapper).removeClass('active');
                            $('.dur-date-item.weekdays div', $wrapper).removeClass('active');
                        } else {
                            resetDurDateItem($wrapper);
                        }
                    });
                });
                $('.monday', $wrapper).on('click', function (ev) {
                    $wrapper.trigger('click-monday');
                });
                $('.tuesday', $wrapper).on('click', function (ev) {
                    $wrapper.trigger('click-tuesday');
                });
                $('.wednesday', $wrapper).on('click', function (ev) {
                    $wrapper.trigger('click-wednesday');
                });
                $('.thursday', $wrapper).on('click', function (ev) {
                    $wrapper.trigger('click-thursday');
                });
                $('.friday', $wrapper).on('click', function (ev) {
                    $wrapper.trigger('click-friday');
                });
                $('.saturday', $wrapper).on('click', function (ev) {
                    $wrapper.trigger('click-saturday');
                });
                $('.sunday', $wrapper).on('click', function (ev) {
                    $wrapper.trigger('click-sunday');
                });
                
                $('.dur-date-item', $wrapper).on('click', function (ev) {
                    var $e = $(this);
                    var $d = $e.find('div');
                    var isActive = $d.hasClass('active');
                    
                    resetAllItem($wrapper);
                    if (isActive) {
                        $d.removeClass('active');
                    } else {
                        $d.addClass('active');
                    }
                    
                    if ($e.hasClass('everyday')) {
                        toggleEveryDay($wrapper, !isActive);
                        $wrapper.trigger('click-everydays');
                    } else if ($e.hasClass('weekdays')) {
                        toggleWeekDays($wrapper, !isActive);
                        $wrapper.trigger('click-weekdays');
                    } else if ($e.hasClass('weekend')) {
                        toggleWeekEnd($wrapper, !isActive);
                        $wrapper.trigger('click-weekend');
                    }
                });
            }
        });	
    }
        
    function toggleEveryDay($wrapper, b) {
        var $d = $('.dur-date-item.everyday div', $wrapper);
        var $everydays = $('.monday, .tuesday, .wednesday, .thursday, .friday, .saturday, .sunday', $wrapper).find('div');
        
        if (b) {
            $d.addClass('active');
            $everydays.addClass('active');
        } else {
            $d.removeClass('active');
            $everydays.removeClass('active');
        }
    }
    function toggleWeekDays($wrapper, b) {
        var $d = $('.dur-date-item.weekdays div', $wrapper);
        var $everydays = $('.monday, .tuesday, .wednesday, .thursday, .friday, .saturday, .sunday', $wrapper).find('div');
        var $weekdays = $('.monday, .tuesday, .wednesday, .thursday, .friday', $wrapper).find('div');
        
        if (b) {
            $d.addClass('active');
            $weekdays.addClass('active');
        } else {
            $d.removeClass('active');
            $weekdays.removeClass('active');
        }
    }
    function toggleWeekEnd($wrapper, b) {
        var $d = $('.dur-date-item.weekend div', $wrapper);
        var $everydays = $('.monday, .tuesday, .wednesday, .thursday, .friday, .saturday, .sunday', $wrapper).find('div');
        var $weekends = $('.saturday, .sunday', $wrapper).find('div');
        
        if (b) {
            $d.addClass('active');
            $weekends.addClass('active');
        } else {
            $d.removeClass('active');
            $weekends.removeClass('active');
        }
    }
    function resetAllItem($wrapper) {
        resetDateItem($wrapper);
        resetDurDateItem($wrapper);
    }
    function resetDateItem($wrapper) {
        $('.date-item  div', $wrapper).removeClass('active');
    }
    function resetDurDateItem($wrapper) {
        $('.dur-date-item.everyday div', $wrapper).removeClass('active');
        $('.dur-date-item.weekdays div', $wrapper).removeClass('active');
        $('.dur-date-item.weekend div', $wrapper).removeClass('active');
    }
    function dateNumber2Text() {
        
    }
    function dateText2Number(text) {
        if (text == 'monday') {
            return 1;
        } else if (text == 'tuesday') {
            return 2;
        } else if (text == 'wednesday') {
            return 3;
        } else if (text == 'thursday') {
            return 4;
        } else if (text == 'friday') {
            return 5;
        } else if (text == 'saturday') {
            return 6;
        } else if (text == 'sunday') {
            return 7;
        }
    }
})($);
