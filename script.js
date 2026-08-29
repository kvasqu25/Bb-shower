(function () {
    window.addEventListener("load", function () {

        var canvas = document.getElementById("confetti-canvas");
        var ctx = canvas.getContext("2d");

        var confettiCount = 120;
        var confettiArray = [];

        var colorPalette = [
            "#89dcff",
            "#F39DC2",
        ];

        var defaultSize = {
            width: 6,
            height: 14
        };

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener("resize", setCanvasSize);
        setCanvasSize();

        function Confetti() {
            this.reset();
        }

        Confetti.prototype.reset = function () {

            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;

            this.w = defaultSize.width + Math.random() * 2;
            this.h = defaultSize.height + Math.random() * 4;

            this.color =
                colorPalette[
                    Math.floor(Math.random() * colorPalette.length)
                ];

            this.speed = 0.7 + Math.random() * 2;
            this.angle = Math.random() * 360;
            this.spin = -4 + Math.random() * 8;
            this.horizontalMovement = Math.random() * 2 - 1;

            this.flipAngle = Math.random() * Math.PI;
            this.flipSpeed = 0.02 + Math.random() * 0.05;
        };

        Confetti.prototype.update = function () {

            this.y += this.speed;
            this.x += this.horizontalMovement;
            this.angle += this.spin;

            this.flipAngle += this.flipSpeed;

            if (this.y > canvas.height + 20) {
                this.reset();
            }

            ctx.save();

            ctx.translate(this.x, this.y);

            var simulatedWidth =
                this.w * Math.sin(this.flipAngle);

            ctx.rotate(
                (this.angle * Math.PI) / 180
            );

            ctx.fillStyle = this.color;

            ctx.fillRect(
                -simulatedWidth / 2,
                -this.h / 2,
                simulatedWidth,
                this.h
            );

            ctx.restore();
        };

        function init() {

            for (var i = 0; i < confettiCount; i++) {

                var c = new Confetti();

                c.y = Math.random() * canvas.height;

                confettiArray.push(c);
            }

            animate();
        }

        function animate() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            for (
                var i = 0;
                i < confettiArray.length;
                i++
            ) {
                confettiArray[i].update();
            }

            requestAnimationFrame(animate);
        }

        init();
    });
})();