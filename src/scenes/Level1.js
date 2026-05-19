export default class Level1 extends Phaser.Scene {

constructor() {
	super("Level1");
}

	editorCreate() {
		this.add.image(768, 512, "QuizScene_PasswordPowerScene_no_txt");
		this.events.emit("scene-awake");
	}

	create() {
		this.editorCreate();
		this.createQuestionBox();
		this.createAnswerButtons();
	}

	createQuestionBox() {
		const box = this.add.graphics();

		box.fillStyle(0xf7f8fb, 1);
		box.lineStyle(3, 0xd3d7e3, 1);

		box.fillRoundedRect(95, 155, 965, 690, 24);
		box.strokeRoundedRect(95, 155, 965, 690, 24);

		this.add.circle(135, 185, 10, 0xff3b30);
		this.add.circle(172, 185, 10, 0xffb000);
		this.add.circle(209, 185, 10, 0x20c933);

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

	makeAnswerButton(letter, answerText, x, y, width, height, isCorrect) {
		const radius = 18;
		const bg = this.add.graphics();

		const drawButton = (fillColor, strokeColor, scale = 1) => {
			const w = width * scale;
			const h = height * scale;

			bg.clear();
			bg.fillStyle(fillColor, 1);
			bg.lineStyle(3, strokeColor, 1);
			bg.fillRoundedRect(x - w / 2, y - h / 2, w, h, radius);
			bg.strokeRoundedRect(x - w / 2, y - h / 2, w, h, radius);
		};

		drawButton(0xf7f8fb, 0xc8ccd8);

		bg.setInteractive(
			new Phaser.Geom.Rectangle(x - width / 2, y - height / 2, width, height),
			Phaser.Geom.Rectangle.Contains
		);

		bg.input.cursor = "pointer";

		const circle = this.add.circle(x - 365, y, 34, 0x5c16d8);

		const letterText = this.add.text(x - 365, y, letter, {
			fontFamily: "Arial Black",
			fontSize: "42px",
			color: "#ffffff"
		}).setOrigin(0.5);

		const answer = this.add.text(x - 290, y, answerText, {
			fontFamily: "Arial Black",
			fontSize: "30px",
			color: "#09071f"
		}).setOrigin(0, 0.5);

		bg.on("pointerover", () => {
			drawButton(0xffffff, 0x7b35ff, 1.03);
			circle.setScale(1.08);
			letterText.setScale(1.08);
			answer.setScale(1.03);
		});

		bg.on("pointerout", () => {
			drawButton(0xf7f8fb, 0xc8ccd8, 1);
			circle.setScale(1);
			letterText.setScale(1);
			answer.setScale(1);
		});

		bg.on("pointerdown", () => {
			this.scene.start(isCorrect ? "feedback_correct" : "feedback_incorrect");
		});
	}
}