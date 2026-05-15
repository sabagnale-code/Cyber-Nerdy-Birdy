
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class QuizScene extends Phaser.Scene {

	constructor() {
		super("QuizScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		this.add.image(768, 512, "QuizScene_PhishingEmailsScene_no_text");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here


createQuestionText() {
	this.add.text(92, 142,
		"Is this email safe or a phishing attempt?\nInspect the email below and choose wisely.",
		{
			fontFamily: "Arial Black",
			fontSize: "30px",
			lineSpacing: 8,
			color: "#ffffff"
		}
	).setShadow(3, 3, "#000000", 4);
}

createEmailCard() {
	this.add.text(112, 305,
`From:        IT Support <support@secure-update.com> 🚩
To:          you@yourcompany.com
Date:        May 14, 2024  9:12 AM
Subject:     Urgent: Verify Your Account Immediately

Dear Employee,
We noticed unusual activity on your account. To prevent suspension, 
please verify your account now by clicking the link below:

http://secure-update.com/verify

Thanks,
IT Support Team`,
		{
			fontFamily: "Arial",
			fontSize: "23px",
			lineSpacing: 11,
			color: "#000000"
		}
	);
}

createChecklist() {
	this.add.text(1160, 195, "THINGS TO CHECK:", {
		fontFamily: "Arial Black",
		fontSize: "28px",
		color: "#111111"
	});

	this.add.text(1135, 265,
`☑ Unknown sender
☑ Urgent language
☑ Suspicious link
☑ Unexpected request
☐ Spelling/grammar`,
		{
			fontFamily: "Arial",
			fontSize: "28px",
			lineSpacing: 18,
			color: "#111111"
		}
	);
}

createScoreText() {
	this.score = 250;

	this.scoreText = this.add.text(1210, 50, `SCORE: ${this.score}`, {
		fontFamily: "Arial Black",
		fontSize: "32px",
		color: "#ffffff"
	})
	.setShadow(3, 3, "#000000", 4);
}

createAnswerButtons() {
	this.makeAnswerButton("🛡  SAFE", 286, 898, 405, 100, 0x4fa914, 0x6ed820, 0xa8ff3c, () => {
		this.scene.start("feedback_incorrect");
	});

	this.makeAnswerButton("↪  PHISHY", 780, 898, 405, 100, 0xc52a22, 0xe23b32, 0xff6b5e, () => {
		this.scene.start("feedback_correct");
	});
}

makeAnswerButton(label, x, y, width, height, fillColor, hoverColor, strokeColor, callback) {
	const radius = 22;
	const bg = this.add.graphics();

	const hitArea = new Phaser.Geom.Rectangle(
		x - width / 2,
		y - height / 2,
		width,
		height
	);

	const drawButton = (color, scale = 1) => {
		const w = width * scale;
		const h = height * scale;

		bg.clear();
		bg.fillStyle(color, 1);
		bg.lineStyle(4, strokeColor, 1);
		bg.fillRoundedRect(x - w / 2, y - h / 2, w, h, radius);
		bg.strokeRoundedRect(x - w / 2, y - h / 2, w, h, radius);
	};

	drawButton(fillColor);

	bg.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
	bg.input.cursor = "pointer";

	const text = this.add.text(x, y, label, {
		fontFamily: "Arial Black",
		fontSize: "42px",
		color: "#ffffff",
		align: "center"
	})
	.setOrigin(0.5)
	.setShadow(3, 3, "#000000", 4);

	bg.on("pointerover", () => {
		drawButton(hoverColor, 1.05);
		text.setScale(1.05);
	});

	bg.on("pointerout", () => {
		drawButton(fillColor, 1);
		text.setScale(1);
	});

	bg.on("pointerdown", callback);

	return { bg, text };
}


create() {
	this.editorCreate();

	this.createTimer();

	this.createQuestionText();
this.createEmailCard();
this.createChecklist();
this.createAnswerButtons();
this.createScoreText();
}

createTimer() {
	this.timeRemaining = 20;

	const x = 768;
	const y = 63;
	const width = 290;
	const height = 88;
	const radius = 20;

	const timerBg = this.add.graphics();

	const drawTimerBox = (strokeColor = 0x4b5d7a) => {
		timerBg.clear();
		timerBg.fillStyle(0x06182b, 0.92);
		timerBg.lineStyle(3, strokeColor, 1);
		timerBg.fillRoundedRect(x - width / 2, y - height / 2, width, height, radius);
		timerBg.strokeRoundedRect(x - width / 2, y - height / 2, width, height, radius);
	};

	drawTimerBox();

	this.timerIcon = this.add.text(x - 90, y, "⏱", {
		fontSize: "52px"
	}).setOrigin(0.5);

	this.timerText = this.add.text(x + 25, y, "00:20", {
		fontFamily: "Arial Black",
		fontSize: "54px",
		color: "#ffffff"
	})
	.setOrigin(0.5)
	.setShadow(3, 3, "#000000", 5);

	this.timerEvent = this.time.addEvent({
		delay: 1000,
		repeat: 19,
		callback: () => {
			this.timeRemaining--;

			const seconds = String(this.timeRemaining).padStart(2, "0");
			this.timerText.setText(`00:${seconds}`);

			if (this.timeRemaining <= 5) {
				this.timerText.setColor("#ff4d4d");
				drawTimerBox(0xff4d4d);

				this.tweens.add({
					targets: [this.timerText, this.timerIcon],
					scale: 1.12,
					duration: 120,
					yoyo: true
				});
			}

			if (this.timeRemaining <= 0) {
				this.timerText.setText("00:00");
				this.timeUp();
			}
		}
	});
}

timeUp() {
	console.log("TIME UP");

	// Example action:
	this.scene.start("feedback_incorrect");
}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
