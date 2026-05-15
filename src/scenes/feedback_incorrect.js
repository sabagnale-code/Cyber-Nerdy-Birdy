
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class feedback_incorrect extends Phaser.Scene {

	constructor() {
		super("feedback_incorrect");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		this.add.image(768, 512, "feedback_incorrect_bg_no_alert_icon");

		this.events.emit("scene-awake");
	}


/* START-USER-CODE */

create() {
	this.editorCreate();

	this.createFeedbackBox();
	this.createTryAgainButton();
	this.animateWarning();
}

createFeedbackBox() {
	const x = 1005;
	const y = 635;
	const width = 760;
	const height = 365;
	const radius = 28;

	const box = this.add.graphics();

	box.fillStyle(0x3b0000, 0.82);
	box.lineStyle(4, 0xd9291f, 1);

	box.fillRoundedRect(
		x - width / 2,
		y - height / 2,
		width,
		height,
		radius
	);

	box.strokeRoundedRect(
		x - width / 2,
		y - height / 2,
		width,
		height,
		radius
	);

	this.add.text(705, 480, "EXPLANATION:", {
		fontFamily: "Arial Black",
		fontSize: "42px",
		color: "#ffffff"
	}).setShadow(3, 3, "#000000", 5);

	this.add.text(
		705,
		560,
		"This email is a phishing attempt.\nClicking the link could steal your information.",
		{
			fontFamily: "Arial",
			fontSize: "32px",
			lineSpacing: 14,
			color: "#ffffff"
		}
	).setShadow(3, 3, "#000000", 4);

	this.add.text(705, 725, "Better luck next time!", {
		fontFamily: "Arial Black",
		fontSize: "36px",
		color: "#ffd51f"
	}).setShadow(3, 3, "#000000", 4);

	this.add.text(1150, 735, "-1 ❤️", {
		fontFamily: "Arial Black",
		fontSize: "38px",
		color: "#ffd51f"
	}).setShadow(3, 3, "#000000", 4);
}

createTryAgainButton() {
	const x = 768;
	const y = 920;
	const width = 440;
	const height = 92;
	const radius = 25;

	const bg = this.add.graphics();

	const drawButton = (fillColor, strokeColor, w = width, h = height) => {
		bg.clear();

		bg.fillStyle(fillColor, 1);
		bg.lineStyle(4, strokeColor, 1);

		bg.fillRoundedRect(
			x - w / 2,
			y - h / 2,
			w,
			h,
			radius
		);

		bg.strokeRoundedRect(
			x - w / 2,
			y - h / 2,
			w,
			h,
			radius
		);
	};

	drawButton(0x006ed8, 0x19d9ff);

	bg.setInteractive(
		new Phaser.Geom.Rectangle(
			x - width / 2,
			y - height / 2,
			width,
			height
		),
		Phaser.Geom.Rectangle.Contains
	);

	bg.input.cursor = "pointer";

	const label = this.add.text(x, y, "TRY AGAIN", {
		fontFamily: "Arial Black",
		fontSize: "44px",
		color: "#ffffff"
	})
	.setOrigin(0.5)
	.setShadow(3, 3, "#000000", 5);

	bg.on("pointerover", () => {
		drawButton(0x118dff, 0x7ee9ff, width * 1.04, height * 1.04);
		label.setScale(1.04);
	});

	bg.on("pointerout", () => {
		drawButton(0x006ed8, 0x19d9ff);
		label.setScale(1);
	});

	bg.on("pointerdown", () => {
		this.scene.start("QuizScene");
	});
}

animateWarning() {
	const x = 190;
	const y = 180;

	const warning = this.add.text(x, y, "⚠", {
		fontFamily: "Arial Black",
		fontSize: "220px",
		color: "#ff3b2f"
	})
	.setOrigin(0.5)
	.setDepth(50)
	.setShadow(0, 0, "#ff2a1a", 18, true, true);

	this.tweens.add({
		targets: warning,
		alpha: { from: 1, to: 0.25 },
		scale: { from: 1, to: 1.12 },
		duration: 420,
		yoyo: true,
		repeat: -1,
		ease: "Sine.easeInOut"
	});

	this.tweens.add({
		targets: warning,
		angle: { from: -3, to: 3 },
		duration: 90,
		yoyo: true,
		repeat: 5
	});
}

/* END-USER-CODE */


}

/* END OF COMPILED CODE */

// You can write more code here
