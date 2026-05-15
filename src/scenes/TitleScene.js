// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class TitleScene extends Phaser.Scene {

	constructor() {
		super("TitleScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		this.add.image(768, 512, "ChatGPT Image May 7, 01_title_intro");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	create() {

		this.editorCreate();

		// PLAY BUTTON
		this.makeButton(
			"PLAY",
			356,
			678,
			537,
			112,
			() => {

				this.scene.start("JourneyMapScene");

			}
		);

		// HOW TO PLAY BUTTON
		this.makeButton(
			"HOW TO PLAY",
			356,
			780,
			537,
			78,
			() => {

				console.log("HOW TO PLAY CLICKED");

			}
		);

		// LEADERBOARD BUTTON
		this.makeButton(
			"LEADERBOARD",
			356,
			865,
			537,
			78,
			() => {

				this.scene.start("LeaderboardScene");

			}
		);
	}

	makeButton(label, x, y, width, height, callback) {

		const radius = 25;

		// Create graphics button
		const bg = this.add.graphics();

		// Draw button function
const drawButton = (fillColor, w = width, h = height) => {
			bg.clear();

			// Fill
			bg.fillStyle(fillColor, 1);

			// Border
			bg.lineStyle(4, 0xa8ff3c, 1);

			// Rounded rectangle
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

		// Initial draw
		drawButton(0x2f9b16);

		// Interactive hit area
		const hitArea = new Phaser.Geom.Rectangle(
			x - width / 2,
			y - height / 2,
			width,
			height
		);

		bg.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);

		// Text
		const text = this.add.text(
			x,
			y,
			label,
			{
				fontFamily: "Arial Black",
				fontSize: label === "PLAY" ? "72px" : "38px",
				color: "#ffffff",
				align: "center"
			}
		)
		.setOrigin(0.5);

	// Hover state
bg.on("pointerover", () => {

	// Redraw slightly larger
	drawButton(
		0x46b91f,
		width * 1.04,
		height * 1.04
	);

	text.setScale(1.04);

});

// Rollout state
bg.on("pointerout", () => {

	// Restore original size
	drawButton(
		0x2f9b16,
		width,
		height
	);

	text.setScale(1);

});

		// Click
		bg.on("pointerdown", callback);

		return { bg, text };
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here