export default class Scene_Level_1_a extends Phaser.Scene {

constructor() {
	super("Scene_Level_1_a");
}

	editorCreate() {
		this.add.image(768, 512, "QuizScene_PasswordPowerScene_no_text");
		this.events.emit("scene-awake");
	}

	create() {
		this.editorCreate();

		this.registry.set("score", 0);
		this.registry.set("lives", 3);
		this.registry.set("timeLeft", 20);
		this.registry.set("questionIndex", 1);
		this.registry.set("totalQuestions", 5);

if (!this.scene.isActive("HudScene")) {
	this.scene.launch("HudScene");
}

this.scene.bringToTop("HudScene");

		this.createQuestionText();
		this.createAnswerButtons();
		this.startTimer();
	}

	createQuestionText() {
		this.add.text(160, 275,
			"You have 40 online accounts.\nWhat is the BEST way to manage passwords?",
			{
				fontFamily: "Arial Black",
				fontSize: "34px",
				lineSpacing: 18,
				color: "#09071f"
			}
		);
	}

	createAnswerButtons() {
		this.makeAnswerButton("A", "Use the same password everywhere", 580, 485, 850, 108, false);
		this.makeAnswerButton("B", "Save them in a password manager", 580, 610, 850, 108, true);
		this.makeAnswerButton("C", "Write them all on paper", 580, 735, 850, 108, false);
	}

	startTimer() {
		this.timeRemaining = 20;

		this.timerEvent = this.time.addEvent({
			delay: 1000,
			callback: () => {
				this.timeRemaining--;
				this.registry.set("timeLeft", this.timeRemaining);

				if (this.timeRemaining <= 0) {
					this.timerEvent.remove();
					this.scene.stop("HudScene");
					this.scene.start("feedback_incorrect");
				}
			},
			callbackScope: this,
			loop: true
		});
	}
}