$(document).ready(function() {

	// Local copy of jQuery selectors, for performance.
	var	my_jPlayer = $("#jquery_jplayer"),
		trackName = $(".track-name"),
		my_playState = $("#now-playing .play-state"),
		my_extraPlayInfo = $("#now-playing .extra-play-info");

	// Some options
	var	opt_play_first = false, // If true, will attempt to auto-play the default track on page loads. No effect on mobile devices, like iOS.
		opt_auto_play = true, // If true, when a track is selected, it will auto-play.
		opt_text_playing = "Now playing: ", // Text when playing
		opt_text_selected = "Track: "; // Text when not playing

	// A flag to capture the first track
	var first_track = true;

  // Track to load initially
  var initialTrackElement = $('a.song-play').first();

	// Change the time format
	$.jPlayer.timeFormat.padMin = true;
	$.jPlayer.timeFormat.padSec = true;
	$.jPlayer.timeFormat.sepMin = ":";
	$.jPlayer.timeFormat.sepSec = "";

	// Initialize the play state text
	my_playState.text(opt_text_selected );
  trackName.text(initialTrackElement.attr('title'));

	// Instance jPlayer
	my_jPlayer.jPlayer({
		ready: function () {
      my_jPlayer.jPlayer("setMedia", 
        { 
          mp3: initialTrackElement.attr("href"),
          oga: initialTrackElement.attr("href").replace(".mp3", ".ogg")
        }
      );
		},
		timeupdate: function(event) {
			my_extraPlayInfo.text(parseInt(event.jPlayer.status.currentPercentAbsolute, 10) + "%");
		},
		play: function(event) {
			my_playState.text(opt_text_playing);
		},
		pause: function(event) {
			my_playState.text(opt_text_selected);
		},
    stop: function(event) {
			my_playState.text(opt_text_selected);
    },
		ended: function(event) {
			my_playState.text(opt_text_selected);
		},
		swfPath: "/",
		cssSelectorAncestor: "#jp_container",
		supplied: "mp3,oga",
		wmode: "window",
    errorAlerts: false
	});

// Create click handlers for the different tracks
	$("a.song-play").click(function(e) {
    $('#now-playing').show();
		trackName.text($(this).attr('title'));

    var thisTrack = $(this).attr("href");
    var currTrack = my_jPlayer.data('jPlayer').status.src;
    if (my_jPlayer.data("jPlayer").status.currentTime != '0' && thisTrack == currTrack) {
      my_jPlayer.jPlayer("play");
      return false;
    }
    console.log(thisTrack.replace(".mp3", ".ogg"));
    my_jPlayer.jPlayer("setMedia", 
      { 
        mp3: thisTrack,
        oga: thisTrack.replace(".mp3", ".ogg")
      }
    );
    // Firefox needs this, evidently
    my_jPlayer.jPlayer("play");
		if((opt_play_first && first_track) || (opt_auto_play && !first_track)) {
			my_jPlayer.jPlayer("play");
		}
		first_track = false;
		$(this).blur();
    /* $(this).hide(); */
    /* $(this).closest('a.jp-pause').show(); */
		return false;
	});

});
