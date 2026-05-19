export default class HudScene extends Phaser.Scene {

	constructor() {
		super("HudScene");
	}

	create() {
		this.createHUD();

		this.updateHUD();

		this.registry.events.on("changedata", this.updateHUD, this);

		this.events.once("shutdown", () => {
			this.registry.events.off("changedata", this.updateHUD, this);
		});
	}

	createHUD() {
		this.hudBg = this.add.rectangle(768, 45, 1536, 90, 0x00142d, 0.85);

		this.livesText = this.add.text(50, 25, "❤️ ❤️ ❤️", {
			fontFamily: "Arial Black",
			fontSize: "34px",
			color: "#ffffff"
		});

		this.timerText = this.add.text(768, 18, "⏱ 00:20", {
			fontFamily: "Arial Black",
			fontSize: "42px",
			color: "#ffffff"
		})
		.setOrigin(0.5, 0)
		.setShadow(3, 3, "#000000", 4);

		this.progressText = this.add.text(930, 45, "1 / 5", {
			fontFamily: "Arial Black",
			fontSize: "20px",
			color: "#19d9ff"
		}).setOrigin(0.5);

		this.scoreText = this.add.text(1480, 28, "SCORE: 0", {
			fontFamily: "Arial Black",
			fontSize: "32px",
			color: "#ffffff"
		}).setOrigin(1, 0);
	}

	updateHUD() {
		const score = this.registry.get("score") ?? 0;
		const lives = this.registry.get("lives") ?? 3;
		const timeLeft = this.registry.get("timeLeft") ?? 20;
		const questionIndex = this.registry.get("questionIndex") ?? 1;
		const totalQuestions = this.registry.get("totalQuestions") ?? 5;

		this.scoreText.setText(`SCORE: ${score}`);
		this.livesText.setText("❤️ ".repeat(lives).trim());
		this.timerText.setText(`⏱ 00:${String(timeLeft).padStart(2, "0")}`);
		this.progressText.setText(`${questionIndex} / ${totalQuestions}`);

		this.timerText.setColor(timeLeft <= 5 ? "#ff4d4d" : "#ffffff");
	}
}