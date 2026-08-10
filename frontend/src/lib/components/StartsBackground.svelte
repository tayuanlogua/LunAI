<script lang="ts">

    const stars = Array.from(
        { length: 250 },
        () => {

            const r = Math.random();

            return {

                left: Math.random() * 100,

                top: Math.random() * 100,

                size:
                    r < 0.75
                    ? "small"
                    : r < 0.95
                    ? "medium"
                    : "big",


                animation:
                    Math.random() < 0.65
                    ? "twinkle"
                    : "float",


                duration:
                    Math.random() < 0.65
                    ? `${2 + Math.random() * 4}s`
                    : `${20 + Math.random() * 40}s`,


                delay:
                    `${Math.random() * 5}s`

            };

        }
    );

</script>


<div class="background-stars">


    {#each stars as star}

        <span
            class={`star ${star.size} ${star.animation}`}
            style:left={`${star.left}%`}
            style:top={`${star.top}%`}
            style:animation-duration={star.duration}
            style:animation-delay={star.delay}>
        </span>


    {/each}


</div>



<style>

.background-stars {

    position: fixed;

    inset: 0;

    overflow: hidden;

    z-index: -1;

    background:
        radial-gradient(
            circle at top,
            #120a17,
            #090014 75%
        );

}



/* Estrellas */

.star {

    position: absolute;

    border-radius: 50%;

    background: #ffffff;

    opacity: .8;

}



/* tamaños */

.small {

    width: 2px;

    height: 2px;

}


.medium {

    width: 4px;

    height: 4px;

}


.big {

    width: 7px;

    height: 7px;

}



/* Animaciones */

.twinkle {

    animation-name: twinkle;

    animation-iteration-count: infinite;

}



.float {

    animation-name: float;

    animation-iteration-count: infinite;

    animation-timing-function: linear;

}



@keyframes twinkle {


    0%,100% {

        opacity: .2;

        transform: scale(.8);

    }


    50% {

        opacity: 1;

        transform: scale(1.5);

    }

}



@keyframes float {


    from {

        transform: translateY(0);

    }


    to {

        transform: translateY(-80px);

    }


}


</style>