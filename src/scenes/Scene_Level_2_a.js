// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Scene_Level_2_a extends Phaser.Scene {

	constructor() {
		super("Scene_Level_2_a");

		/* START-USER-CTR-CODE */
		// Write your code here.



		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// quizScene_PhishingEmailsScene_no_text
		this.add.image(747, 478, "QuizScene_PhishingEmailsScene_no_text_no_hearts");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */



	// Write your code here


createQuestionText() {
	this.add.text(60, 142,
		"Is this email safe or a phishing attempt? Inspect the email below and choose wisely.",
		{
			fontFamily: "Arial",
			fontSize: "26px",
			lineSpacing: 8,
			color: "#ffffff"
		}
	).setShadow(3, 3, "#000000", 4);
}



createEmailCard() {
    this.add.text(112, 275, 
`From: IT Support <support@secure-update.com> 🚩
To: you@yourcompany.com
Date: May 14, 2024 9:12 AM
Subject: Urgent: Verify Your Account Immediately

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
    this.add.text(1120, 175, "THINGS TO CHECK:", {
        fontFamily: "Arial Black",
        fontSize: "28px",
        color: "#111111"
    });

    this.add.text(1115, 230, 
`☑ Unknown sender
☑ Urgent language
☑ Suspicious link
☑ Unexpected request
☐ Spelling/grammar`, // ➔ String is now enclosed in backticks, and the comma is removed
        {
            fontFamily: "Arial",
            fontSize: "28px",
            lineSpacing: 18, // Check your editor's auto-suggestions, it is typically lineSpacing
            color: "#111111"
        }
    );
}




/* 
createScoreText() {
	this.score = 250;

	this.scoreText = this.add.text(1210, 25, `SCORE: ${this.score}`, {
		fontFamily: "Arial Black",
		fontSize: "32px",
		color: "#ffffff"
	})
	.setShadow(3, 3, "#000000", 4);
}
*/

createAnswerButtons() {
	this.makeAnswerButton("🛡  SAFE", 286, 898, 405, 100, 0x4fa914, 0x6ed820, 0xa8ff3c, () => {
		if (this.timerEvent) this.timerEvent.remove(false);
		this.scene.stop("HudScene");
		this.scene.start("feedback_incorrect");
	});

	this.makeAnswerButton("↪  PHISHY", 780, 898, 405, 100, 0xc52a22, 0xe23b32, 0xff6b5e, () => {
		if (this.timerEvent) this.timerEvent.remove(false);
		this.scene.stop("HudScene");
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

startQuestionTimer() {
	this.timeRemaining = 20;

	this.timerEvent = this.time.addEvent({
		delay: 1000,
		loop: true,
		callback: () => {
			this.timeRemaining--;

			this.registry.set("timeLeft", this.timeRemaining);

			if (this.timeRemaining <= 0) {
				this.timerEvent.remove(false);

				this.scene.stop("HudScene");
				this.scene.start("feedback_incorrect");
			}
		}
	});
}

create() {
	this.editorCreate();

	this.registry.set("score", 250);
	this.registry.set("lives", 3);
	this.registry.set("timeLeft", 20);
	this.registry.set("questionIndex", 1);
	this.registry.set("totalQuestions", 5);

	this.scene.launch("HudScene");
	this.scene.bringToTop("HudScene");

	this.startQuestionTimer();

	this.createQuestionText();
	this.createEmailCard();
	this.createChecklist();
	this.createAnswerButtons();
}

/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here