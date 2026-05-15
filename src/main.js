import Preload from "./scenes/Preload.js"; 
import TitleScene from "./scenes/TitleScene.js";
import JourneyMapScene from "./scenes/JourneyMapScene.js";
import Level from "./scenes/Level.js";
import QuizScene from "./scenes/QuizScene.js";
import feedback_correct from "./scenes/FeedbackScene.js";
import feedback_incorrect from "./scenes/feedback_incorrect.js";


class Boot extends Phaser.Scene {

	preload() {
		this.load.pack("pack", "assets/preload-asset-pack.json");
	}

	create() {
		this.scene.start("Preload");
	}
}

window.addEventListener("load", function () {

	const game = new Phaser.Game({
		width: 1536,
		height: 1024,
		type: Phaser.AUTO,
		backgroundColor: "#000b28",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});

	game.scene.add("Boot", Boot, true);
	game.scene.add("Preload", Preload);
	game.scene.add("TitleScene", TitleScene);
	game.scene.add("Level", Level);
	game.scene.add("JourneyMapScene", JourneyMapScene);
	game.scene.add("QuizScene", QuizScene);

	game.scene.add("feedback_correct", feedback_correct);
	game.scene.add("feedback_incorrect", feedback_incorrect);

});




	/* game.scene.add("PasswordPowerScene", PasswordPowerScene);
	game.scene.add("PhishingEmailsScene", PhishingEmailsScene);
	game.scene.add("SafeBrowsingScene", SafeBrowsingScene);
	game.scene.add("DataProtectionScene", DataProtectionScene); */


