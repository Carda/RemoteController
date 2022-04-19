$(document).ready(function() {
    var apiURL = "http://192.168.0.85/";

    function changeChecked(stat) {
        if (stat === 1) {
            console.log("stat 1");
            $('.ui-switch-input').prop('checked', true);
        } else {
            console.log("stat !1");
            $('.ui-switch-input').prop('checked', false);
        }
    }

    $.getJSON(apiURL + 'getStatus')
        .done(function(response) {
            console.log("get done" + response.power_stat);
            changeChecked(response.power_stat);
        })
        .fail(function() {
            alert("The RemoteButton for ArdaTV PC is not working.!");
        });

    $('#start').on('click', function() {
        $.post(apiURL + 'start', '{"power":"on"}')
            .done(function(response) {
                changeChecked(response.power_stat);
            });
    });

    $('#forceStop').on('click', function() {
        $.post(apiURL + 'trigger', '{"power":"trig","duration":3000}')
            .done(function(response) {
                changeChecked(response.power_stat);
            });
    });
});