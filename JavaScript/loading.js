document.querySelectorAll('.boot-line').forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = 1;
        }, (index + 1) * 1500 + 1000);
    });

    //fade out
    const terminal = document.querySelector('.terminal');

    //total duration of animation
    const fadeDelay = 6000; //the numebr is milisecond do not mistake for seconds

    setTimeout(() => {
        terminal.classList.add('fade-out');
        setTimeout(() => {
            terminal.remove();
        }, 1000);
    }, fadeDelay);