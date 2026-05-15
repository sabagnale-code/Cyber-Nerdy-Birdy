
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class GameButton extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 702, y ?? 585);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(234, 52, 468, 104);
		rectangle_1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 468, 104), Phaser.Geom.Rectangle.Contains);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 3119894;
		rectangle_1.strokeColor = 11075388;
		rectangle_1.lineWidth = 4;
		rectangle_1.setRounded(25);
		this.add(rectangle_1);

		// text_1
		const text_1 = scene.add.text(222, 51, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "PLAY";
		text_1.setStyle({ "align": "center", "fontFamily": "Helvetica", "fontSize": "72px", "fontStyle": "bold", "stroke": "#033b017f", "strokeThickness": 2.5 });
		this.add(text_1);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
