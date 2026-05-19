
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class FeedbackScene extends Phaser.Scene {

	constructor() {
		super("feedback_correct");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		this.add.image(768, 512, "feedback_correct_background");

		this.events.emit("scene-awake");
	}

	
/* START-USER-CODE */

create() {
	this.editorCreate();

	this.createFeedbackBox();
	this.createContinueButton();
	this.createConfetti();
}

createFeedbackBox() {
	const x = 1045;
	const y = 580;
	const width = 735;
	const height = 485;
	const radius = 25;

	const box = this.add.graphics();

	box.fillStyle(0x06182b, 0.92);
	box.lineStyle(3, 0x0b79b7, 1);

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

	box.setDepth(10);

	this.add.text(735, 380, "You spotted the phish!", {
		fontFamily: "Arial Black",
		fontSize: "48px",
		color: "#ffffff"
	})
	.setDepth(11)
	.setShadow(3, 3, "#000000", 5);

	this.add.text(735, 475, "EXPLANATION:", {
		fontFamily: "Arial Black",
		fontSize: "40px",
		color: "#19d9ff"
	})
	.setDepth(11)
	.setShadow(3, 3, "#000000", 5);

	this.add.text(
		735,
		555,
		"The sender's address is suspicious\nand the link does not match the\nlegitimate domain.",
		{
			fontFamily: "Arial",
			fontSize: "38px",
			lineSpacing: 12,
			color: "#ffffff"
		}
	)
	.setDepth(11)
	.setShadow(3, 3, "#000000", 4);

	this.add.text(735, 725, "⭐ +100 XP", {
		fontFamily: "Arial Black",
		fontSize: "52px",
		color: "#ffd51f"
	})
	.setDepth(11)
	.setShadow(3, 3, "#000000", 5);
}

createContinueButton() {
	const x = 768;
	const y = 900;
	const width = 485;
	const height = 95;
	const radius = 25;

	const bg = this.add.graphics();

	const drawButton = (fillColor, w = width, h = height) => {
		bg.clear();

		bg.fillStyle(fillColor, 1);
		bg.lineStyle(5, 0x19d9ff, 1);

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

	drawButton(0x006fd6);

	bg.setDepth(20);

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

	const label = this.add.text(x, y, "CONTINUE", {
		fontFamily: "Arial Black",
		fontSize: "44px",
		color: "#ffffff"
	})
	.setOrigin(0.5)
	.setDepth(21)
	.setShadow(4, 4, "#000000", 5);

	bg.on("pointerover", () => {
		drawButton(0x008cff, width * 1.04, height * 1.04);
		label.setScale(1.04);
	});

	bg.on("pointerout", () => {
		drawButton(0x006fd6);
		label.setScale(1);
	});

	bg.on("pointerdown", () => {
		this.scene.start("JourneyMapScene");
	});
}

createConfetti() {
	const colors = [
		0xff3b7f,
		0xffd21f,
		0x32e875,
		0x19d9ff,
		0xb84dff,
		0xffffff
	];

	for (let i = 0; i < 90; i++) {
		const x = Phaser.Math.Between(0, 1536);
		const y = Phaser.Math.Between(-700, -20);
		const w = Phaser.Math.Between(8, 18);
		const h = Phaser.Math.Between(12, 28);
		const color = Phaser.Utils.Array.GetRandom(colors);

		const confetti = this.add.rectangle(x, y, w, h, color, 1);
		confetti.setDepth(1000);
		confetti.setAngle(Phaser.Math.Between(0, 360));

		this.tweens.add({
			targets: confetti,
			y: 1100,
			x: x + Phaser.Math.Between(-120, 120),
			angle: confetti.angle + Phaser.Math.Between(180, 720),
			duration: Phaser.Math.Between(2500, 5200),
			delay: Phaser.Math.Between(0, 900),
			ease: "Sine.easeInOut",
			repeat: -1,
			onRepeat: () => {
				confetti.y = Phaser.Math.Between(-500, -20);
				confetti.x = Phaser.Math.Between(0, 1536);
			}
		});
	}
}

/* END-USER-CODE */

}

/* END OF COMPILED CODE */

// You can write more code here
