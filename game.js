function brickBreaker() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
  
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = (6 * Math.random()) - 3;
    let dy = -2;
    const ballRadius = 10;
    const paddleHeight = 10;
    const paddleWidth = 100;
    let paddleX = (canvas.width - paddleWidth) / 2 -300;
    let rightPressed = false;
    let leftPressed = false;
    const brickRowCount = 5;
    const brickColumnCount = 11;
    const brickWidth = 83;
    const brickHeight = 28;
    const brickPadding = 2;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 30;
    let score = 0;
    let lives = 3;

    const bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
  
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);
  
    function keyDownHandler(e) {
      if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
      }
    }
  
    function keyUpHandler(e) {
      if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
      }
    }
  
    function mouseMoveHandler(e) {
      const relativeX = e.clientX - canvas.offsetLeft;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
      }
    }
  
    function collisionDetection() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
              dy = -dy;
              b.status = 0;
              score++;
              if (score === brickRowCount * brickColumnCount) {
                alert("YOU WIN, CONGRATULATIONS!");
                document.location.reload();
                cancelAnimationFrame(animationId);
              }
            }
          }
        }
      }
    }
  
    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#33CCFF";
      ctx.fill();
      ctx.closePath();
    }
  
    function drawPaddle() {
      ctx.beginPath();
      ctx.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 5);
      ctx.fillStyle = "#33CCFF";
      ctx.fill();
      ctx.closePath();
    }
  
    function drawBricks() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = '#' + parseInt(Math.random() * 0xffffff).toString(16);
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }
  
    function drawScore() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#57d313";
      ctx.fillText(`Score: ${score}`, 8, 20);
    }
  
    function drawLives() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#FF0000";
      ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
    }
  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawBricks();
      drawPaddle();
      drawScore();
      drawLives();
      collisionDetection();
  
      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
  
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
        } else {
          lives--;
          if (!lives) {
            alert("GAME OVER");
            document.location.reload();
            cancelAnimationFrame(animationId);
          } else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width - paddleWidth) / 2;
          }
        }
      }
  
      x += dx * 3;
      y += dy * 3;
  
      if (rightPressed) {
        paddleX = Math.min(paddleX + 14, canvas.width - paddleWidth);
      } else if (leftPressed) {
        paddleX = Math.max(paddleX - 14, 0);
      }
  
      animationId = requestAnimationFrame(draw);
    }
  
    let animationId = requestAnimationFrame(draw);

    document.addEventListener("keydown", function (e) {
      if (e.key === "p" || e.key === "P") {
        togglePause();
      }
    });
  
    function togglePause() {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      } else {
        animationId = requestAnimationFrame(draw);
      }
    }
  }
  
  document.getElementById("start").addEventListener("click", brickBreaker);

