<script lang="ts">
    import { onMount } from 'svelte';

    type Mood = 'idle' | 'thinking' | 'happy' | 'listening';

    let {
        mood = 'idle',
        size = 150
    }: {
        mood?: Mood;
        size?: number;
    } = $props();

    let blink = $state(false);

    onMount(() => {
        let timer: number;

        const blinkLoop = () => {
            timer = window.setTimeout(() => {
                blink = true;

                window.setTimeout(() => {
                    blink = false;
                    blinkLoop();
                }, 140);
            }, 500 + Math.random() * 1800);
        };

        blinkLoop();

        return () => window.clearTimeout(timer);
    });

    const eyeScale = $derived(blink ? 0.08 : 1);

    const mouthPath = $derived(
        mood === 'happy'
            ? 'M 291 340 Q 320 365 349 340'
            : mood === 'thinking'
                ? 'M 296 344 Q 320 334 344 344'
                : 'M 299 340 Q 320 354 341 340'
    );
</script>

<div
    class="cat"
    class:listening={mood === 'listening'}
    class:thinking={mood === 'thinking'}
    class:happy={mood === 'happy'}
    style={`width:${size}px; height:${size}px`}
    aria-label="LunaAI"
    role="img"
>
    <svg
        viewBox="0 0 640 700"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <defs>

            <!-- =====================================================
                 PELAJE PRINCIPAL
            ====================================================== -->

            <linearGradient
                id="fur"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
            >
                <stop offset="0%" stop-color="#fffefa" />
                <stop offset="25%" stop-color="#fffaf4" />
                <stop offset="55%" stop-color="#f5eee7" />
                <stop offset="78%" stop-color="#ebe1d8" />
                <stop offset="100%" stop-color="#d7c9c0" />
            </linearGradient>

            <linearGradient
                id="furLight"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
            >
                <stop offset="0%" stop-color="#ffffff" />
                <stop offset="60%" stop-color="#faf4ee" />
                <stop offset="100%" stop-color="#e9ded5" />
            </linearGradient>

            <linearGradient
                id="furShadow"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
            >
                <stop offset="0%" stop-color="#eee3da" />
                <stop offset="100%" stop-color="#cdbeb4" />
            </linearGradient>

            <!-- =====================================================
                 OREJAS
            ====================================================== -->

            <linearGradient
                id="ear"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
            >
                <stop offset="0%" stop-color="#fffaf5" />
                <stop offset="45%" stop-color="#eee3dc" />
                <stop offset="100%" stop-color="#cbb9ae" />
            </linearGradient>

            <linearGradient
                id="earPink"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
            >
                <stop offset="0%" stop-color="#b9878b" />
                <stop offset="45%" stop-color="#d9a9aa" />
                <stop offset="100%" stop-color="#efc6c5" />
            </linearGradient>

            <!-- =====================================================
                 OJOS AZULES
            ====================================================== -->

            <radialGradient id="blueEye" cx="42%" cy="35%">
                <stop offset="0%" stop-color="#e8faff" />
                <stop offset="18%" stop-color="#a9e9ff" />
                <stop offset="43%" stop-color="#61bce9" />
                <stop offset="70%" stop-color="#2c75ad" />
                <stop offset="100%" stop-color="#173d69" />
            </radialGradient>

            <radialGradient id="eyeCenter">
                <stop offset="0%" stop-color="#6ecfff" />
                <stop offset="70%" stop-color="#2472aa" />
                <stop offset="100%" stop-color="#173b61" />
            </radialGradient>

            <!-- =====================================================
                 COLLAR
            ====================================================== -->

            <linearGradient
                id="collar"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
            >
                <stop offset="0%" stop-color="#d9c3e9" />
                <stop offset="35%" stop-color="#c4a9dd" />
                <stop offset="70%" stop-color="#aa8acb" />
                <stop offset="100%" stop-color="#8d6eb1" />
            </linearGradient>

            <linearGradient
                id="medal"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
            >
                <stop offset="0%" stop-color="#fffdfb" />
                <stop offset="55%" stop-color="#f7efec" />
                <stop offset="100%" stop-color="#d9c9c8" />
            </linearGradient>

            <!-- =====================================================
                 SOMBRAS
            ====================================================== -->

            <filter id="shadow">
                <feGaussianBlur stdDeviation="8" />
            </filter>

            <filter id="soft">
                <feGaussianBlur stdDeviation="3" />
            </filter>

            <filter id="eyeGlow">
                <feGaussianBlur stdDeviation="1.4" />
            </filter>

            <radialGradient id="faceLight">
                <stop offset="0%" stop-color="#ffffff" stop-opacity=".75" />
                <stop offset="65%" stop-color="#ffffff" stop-opacity=".15" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
            </radialGradient>

        </defs>

        <!-- =====================================================
             SOMBRA
        ====================================================== -->

        <ellipse
            cx="323"
            cy="674"
            rx="240"
            ry="22"
            fill="#88759d"
            opacity=".16"
            filter="url(#shadow)"
        />

        <!-- =====================================================
             COLA GRANDE DEL GATO
        ====================================================== -->

        <path
            d="
                M 365 618
                C 424 638 526 643 575 594
                C 611 558 610 507 581 488
                C 553 469 522 491 529 518
                C 534 537 555 536 564 550
                C 574 566 555 585 528 589
                C 485 596 430 573 382 549
            "
            fill="none"
            stroke="#d6c7bd"
            stroke-width="105"
            stroke-linecap="round"
        />

        <path
            d="
                M 365 618
                C 424 638 526 643 575 594
                C 611 558 610 507 581 488
                C 553 469 522 491 529 518
                C 534 537 555 536 564 550
                C 574 566 555 585 528 589
                C 485 596 430 573 382 549
            "
            fill="none"
            stroke="url(#fur)"
            stroke-width="89"
            stroke-linecap="round"
        />

        <!-- pelos de la cola -->

        <g
            fill="none"
            stroke="#d5c5bb"
            stroke-linecap="round"
            opacity=".65"
        >
            <path
                d="M 423 598 Q 478 621 527 601"
                stroke-width="3"
            />
            <path
                d="M 445 610 Q 498 628 541 602"
                stroke-width="2"
            />
            <path
                d="M 478 608 Q 526 615 554 586"
                stroke-width="2"
            />
            <path
                d="M 515 580 Q 550 578 570 555"
                stroke-width="3"
            />
        </g>

        <!-- =====================================================
             CUERPO
        ====================================================== -->

        <path
            d="
                M 181 397
                C 125 432 108 505 122 580
                C 134 639 180 669 248 671
                C 318 675 397 663 443 625
                C 469 603 477 555 462 500
                C 447 444 411 408 369 394
                C 316 377 227 375 181 397
                Z
            "
            fill="url(#fur)"
        />

        <!-- sombra lateral izquierda -->

        <path
            d="
                M 168 420
                C 128 470 132 578 166 623
                C 181 643 207 655 230 658
                C 201 620 193 566 202 508
                C 208 466 219 431 238 402
                Z
            "
            fill="#dfd2c9"
            opacity=".48"
        />

        <!-- sombra lateral derecha -->

        <path
            d="
                M 389 407
                C 438 445 458 507 449 570
                C 444 607 420 630 392 643
                C 416 595 415 534 401 481
                C 394 450 382 425 367 405
                Z
            "
            fill="#d9cbc1"
            opacity=".48"
        />

        <!-- =====================================================
             PECHO MUY PELUDO
        ====================================================== -->

        <path
            d="
                M 206 405
                C 196 453 203 512 224 562
                C 241 602 270 635 321 648
                C 365 633 397 596 414 553
                C 434 502 433 447 414 405
                C 364 381 252 382 206 405
                Z
            "
            fill="url(#furLight)"
        />

        <!-- mechones del pecho -->

        <g
            fill="none"
            stroke-linecap="round"
            opacity=".5"
        >
            <path
                d="M 218 433 Q 223 486 249 530"
                stroke="#d8cbc1"
                stroke-width="4"
            />

            <path
                d="M 232 425 Q 240 491 267 551"
                stroke="#e0d4ca"
                stroke-width="3"
            />

            <path
                d="M 250 421 Q 260 500 283 575"
                stroke="#d8cbc1"
                stroke-width="3"
            />

            <path
                d="M 276 420 Q 283 507 300 600"
                stroke="#e3d8d0"
                stroke-width="4"
            />

            <path
                d="M 366 422 Q 359 507 336 590"
                stroke="#d9ccc2"
                stroke-width="3"
            />

            <path
                d="M 390 429 Q 382 494 355 553"
                stroke="#ded2c9"
                stroke-width="3"
            />

            <path
                d="M 407 441 Q 397 486 374 527"
                stroke="#d3c5bb"
                stroke-width="3"
            />
        </g>

        <!-- =====================================================
             OREJA IZQUIERDA
        ====================================================== -->

        <path
            d="
                M 181 213
                C 164 179 162 116 176 78
                C 183 59 197 55 211 74
                L 273 174
                C 239 178 206 192 181 213
                Z
            "
            fill="url(#ear)"
        />

        <!-- interior oreja -->

        <path
            d="
                M 183 164
                C 178 137 181 105 190 91
                C 196 82 203 84 211 97
                L 247 164
                C 224 164 201 167 183 164
                Z
            "
            fill="url(#earPink)"
            opacity=".82"
        />

        <!-- pelo oreja -->

        <g
            stroke="#cdbdb3"
            stroke-linecap="round"
            opacity=".75"
        >
            <path d="M 181 111 L 172 91" stroke-width="3" />
            <path d="M 187 101 L 181 76" stroke-width="2" />
            <path d="M 194 99 L 192 70" stroke-width="2" />
            <path d="M 201 104 L 205 78" stroke-width="2" />
            <path d="M 208 112 L 218 88" stroke-width="2" />
        </g>

        <!-- =====================================================
             OREJA DERECHA
        ====================================================== -->

        <path
            d="
                M 459 213
                C 476 179 478 116 464 78
                C 457 59 443 55 429 74
                L 367 174
                C 401 178 434 192 459 213
                Z
            "
            fill="url(#ear)"
        />

        <path
            d="
                M 457 164
                C 462 137 459 105 450 91
                C 444 82 437 84 429 97
                L 393 164
                C 416 164 439 167 457 164
                Z
            "
            fill="url(#earPink)"
            opacity=".82"
        />

        <g
            stroke="#cdbdb3"
            stroke-linecap="round"
            opacity=".75"
        >
            <path d="M 459 111 L 468 91" stroke-width="3" />
            <path d="M 453 101 L 459 76" stroke-width="2" />
            <path d="M 446 99 L 448 70" stroke-width="2" />
            <path d="M 439 104 L 435 78" stroke-width="2" />
            <path d="M 432 112 L 422 88" stroke-width="2" />
        </g>

        <!-- =====================================================
             CABEZA
        ====================================================== -->

        <path
            d="
                M 320 151

                C 263 146 211 163 182 202
                C 153 240 145 302 158 351
                C 171 403 214 438 264 452
                C 286 458 303 461 320 461
                C 337 461 354 458 376 452
                C 426 438 469 403 482 351
                C 495 302 487 240 458 202
                C 429 163 377 146 320 151

                Z
            "
            fill="url(#fur)"
        />

        <!-- iluminação do rosto -->

        <ellipse
            cx="320"
            cy="286"
            rx="150"
            ry="125"
            fill="url(#faceLight)"
            opacity=".65"
        />

        <!-- =====================================================
             SOMBRAS NATURALES DEL ROSTRO
        ====================================================== -->

        <!-- frente -->

        <path
            d="
                M 320 158
                C 301 181 293 210 295 240
                C 297 265 307 278 320 285
                C 333 278 343 265 345 240
                C 347 210 339 181 320 158
                Z
            "
            fill="#e8ddd5"
            opacity=".42"
        />

        <!-- mejilla izquierda -->

        <path
            d="
                M 178 293
                C 183 347 215 390 265 403
                C 238 373 227 337 232 302
                C 237 270 253 239 276 218
                C 225 227 187 254 178 293
                Z
            "
            fill="#ded0c7"
            opacity=".36"
        />

        <!-- mejilla derecha -->

        <path
            d="
                M 462 293
                C 457 347 425 390 375 403
                C 402 373 413 337 408 302
                C 403 270 387 239 364 218
                C 415 227 453 254 462 293
                Z
            "
            fill="#d9cbc2"
            opacity=".36"
        />

        <!-- =====================================================
             MEJILLAS / PELO LATERAL
        ====================================================== -->

        <g fill="#fffaf5">

            <path
                d="
                    M 172 314
                    C 153 330 158 363 183 376
                    C 168 357 180 335 205 326
                    Z
                "
            />

            <path
                d="
                    M 468 314
                    C 487 330 482 363 457 376
                    C 472 357 460 335 435 326
                    Z
                "
            />

        </g>

        <!-- =====================================================
             OJOS
        ====================================================== -->

        <g
            class="eyes"
            style={`transform:scaleY(${eyeScale})`}
        >

            <!-- ojo izquierdo -->

            <ellipse
                cx="255"
                cy="281"
                rx="43"
                ry="54"
                fill="url(#blueEye)"
            />

            <ellipse
                cx="385"
                cy="281"
                rx="43"
                ry="54"
                fill="url(#blueEye)"
            />

            <!-- borde oscuro -->

            <ellipse
                cx="255"
                cy="281"
                rx="43"
                ry="54"
                fill="none"
                stroke="#17466f"
                stroke-width="4"
            />

            <ellipse
                cx="385"
                cy="281"
                rx="43"
                ry="54"
                fill="none"
                stroke="#17466f"
                stroke-width="4"
            />

            <!-- pupilas -->

            <ellipse
                cx="258"
                cy="285"
                rx="13"
                ry="31"
                fill="#15212d"
            />

            <ellipse
                cx="388"
                cy="285"
                rx="13"
                ry="31"
                fill="#15212d"
            />

            <!-- brillo grande -->

            <ellipse
                cx="244"
                cy="260"
                rx="11"
                ry="15"
                fill="white"
            />

            <ellipse
                cx="374"
                cy="260"
                rx="11"
                ry="15"
                fill="white"
            />

            <!-- brillo pequeño -->

            <circle
                cx="270"
                cy="302"
                r="5"
                fill="white"
                opacity=".8"
            />

            <circle
                cx="400"
                cy="302"
                r="5"
                fill="white"
                opacity=".8"
            />

        </g>

        <!-- =====================================================
             PELO SOBRE LOS OJOS
        ====================================================== -->

        <g
            fill="none"
            stroke-linecap="round"
            opacity=".6"
        >
            <path
                d="M 204 245 Q 227 218 257 211"
                stroke="#d8cbc2"
                stroke-width="5"
            />

            <path
                d="M 207 251 Q 232 226 263 218"
                stroke="#e4d9d1"
                stroke-width="3"
            />

            <path
                d="M 436 245 Q 413 218 383 211"
                stroke="#d8cbc2"
                stroke-width="5"
            />

            <path
                d="M 433 251 Q 408 226 377 218"
                stroke="#e4d9d1"
                stroke-width="3"
            />
        </g>

        <!-- =====================================================
             NARIZ ROSA
        ====================================================== -->

        <path
            d="
                M 298 326
                Q 320 309 342 326
                Q 339 349 320 355
                Q 301 349 298 326
                Z
            "
            fill="#e8a6a5"
        />

        <path
            d="
                M 304 326
                Q 320 316 336 326
                Q 320 338 304 326
                Z
            "
            fill="#f1b8b6"
        />

        <path
            d="M 320 337 L 320 349"
            stroke="#b87d80"
            stroke-width="2"
            stroke-linecap="round"
        />

        <!-- =====================================================
             BOCA
        ====================================================== -->

        <path
            d={mouthPath}
            fill="none"
            stroke="#9b6d6d"
            stroke-width="3"
            stroke-linecap="round"
        />

        <!-- =====================================================
             BIGOTES
        ====================================================== -->

        <g
            fill="none"
            stroke="#b7aaa2"
            stroke-width="2"
            stroke-linecap="round"
            opacity=".8"
        >
            <path
                d="M 282 337 C 235 328 194 316 151 315"
            />

            <path
                d="M 280 348 C 230 346 188 348 148 359"
            />

            <path
                d="M 282 358 C 238 367 201 383 166 401"
            />

            <path
                d="M 358 337 C 405 328 446 316 489 315"
            />

            <path
                d="M 360 348 C 410 346 452 348 492 359"
            />

            <path
                d="M 358 358 C 402 367 439 383 474 401"
            />
        </g>

        <!-- =====================================================
             COLLAR LILA
        ====================================================== -->

        <path
            d="
                M 218 407
                C 243 437 279 453 320 455
                C 361 453 397 437 422 407
                L 405 391
                C 382 416 352 428 320 429
                C 288 428 258 416 235 391
                Z
            "
            fill="url(#collar)"
        />

        <!-- brillo del collar -->

        <path
            d="
                M 232 407
                C 257 432 289 443 320 444
                C 351 443 383 432 408 407
            "
            fill="none"
            stroke="#eadcf4"
            stroke-width="5"
            opacity=".7"
        />

        <!-- =====================================================
             ARGOLLA
        ====================================================== -->

        <rect
            x="312"
            y="438"
            width="16"
            height="27"
            rx="7"
            fill="#b79acb"
        />

        <rect
            x="316"
            y="441"
            width="8"
            height="20"
            rx="4"
            fill="#e4d2ec"
        />

        <!-- =====================================================
             MEDALLÓN
        ====================================================== -->

        <circle
            cx="320"
            cy="487"
            r="39"
            fill="#b99cc8"
            opacity=".25"
        />

        <circle
            cx="320"
            cy="484"
            r="34"
            fill="url(#medal)"
            stroke="#ccb7d0"
            stroke-width="3"
        />

        <circle
            cx="320"
            cy="484"
            r="29"
            fill="#fffaf8"
        />

        <!-- luna -->

        <path
            d="
                M 332 458
                C 313 461 302 478 306 494
                C 310 512 331 520 348 507
                C 330 510 317 499 317 483
                C 317 473 323 464 332 458
                Z
            "
            fill="#9a78c4"
        />

        <!-- estrellas -->

        <path
            d="
                M 345 466
                L 348 472
                L 354 475
                L 348 478
                L 345 484
                L 342 478
                L 336 475
                L 342 472
                Z
            "
            fill="#aa8ace"
        />

        <path
            d="
                M 333 492
                L 335 496
                L 339 498
                L 335 500
                L 333 504
                L 331 500
                L 327 498
                L 331 496
                Z
            "
            fill="#b69bd5"
        />

        <!-- =====================================================
             PATITAS
        ====================================================== -->

        <path
            d="
                M 169 612
                C 166 632 181 649 204 651
                C 224 653 238 643 239 625
                C 231 608 214 598 194 599
                C 181 599 173 604 169 612
                Z
            "
            fill="url(#furLight)"
        />

        <path
            d="
                M 401 625
                C 402 643 416 653 436 651
                C 459 649 474 632 471 612
                C 467 604 459 599 446 599
                C 426 598 409 608 401 625
                Z
            "
            fill="url(#furLight)"
        />

        <!-- dedos -->

        <g
            fill="none"
            stroke="#d0c0b7"
            stroke-width="2"
            stroke-linecap="round"
        >
            <path d="M 190 634 Q 196 640 202 633" />
            <path d="M 207 632 Q 213 638 219 630" />

            <path d="M 421 630 Q 427 638 433 632" />
            <path d="M 438 633 Q 444 640 450 634" />
        </g>

        <!-- =====================================================
             PELOS FINOS ALREDEDOR DE LA CABEZA
        ====================================================== -->

        <g
            fill="none"
            stroke="#eee5df"
            stroke-width="2"
            stroke-linecap="round"
            opacity=".85"
        >
            <path d="M 178 229 Q 151 215 137 194" />
            <path d="M 170 242 Q 143 232 124 215" />
            <path d="M 164 259 Q 135 254 116 243" />

            <path d="M 462 229 Q 489 215 503 194" />
            <path d="M 470 242 Q 497 232 516 215" />
            <path d="M 476 259 Q 505 254 524 243" />

            <path d="M 195 198 Q 174 179 165 159" />
            <path d="M 445 198 Q 466 179 475 159" />
        </g>

    </svg>

    {#if mood === 'thinking'}
        <div class="thinking-dots" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
        </div>
    {/if}
</div>

<style>
    .cat {
        position: relative;
        display: grid;
        place-items: center;
        flex: 0 0 auto;

        animation: float 4.5s ease-in-out infinite;

        filter:
            drop-shadow(0 12px 16px rgba(104, 81, 132, .13))
            drop-shadow(0 2px 5px rgba(104, 81, 132, .08));
    }

    .cat svg {
        width: 100%;
        height: 100%;
        overflow: visible;
    }

    .eyes {
        transform-origin: 320px 281px;
        transition: transform .08s ease;
    }

    .listening {
        filter:
            drop-shadow(0 12px 16px rgba(104, 81, 132, .16))
            drop-shadow(0 0 18px rgba(190, 166, 235, .42));
    }

    .thinking {
        animation-duration: 2.5s;
    }

    .happy {
        animation-duration: 3.4s;
    }

    .thinking-dots {
        position: absolute;
        right: 0;
        top: 5%;

        display: flex;
        gap: 4px;

        padding: 7px 9px;

        border-radius: 999px;

        background: rgba(255, 250, 255, .94);

        border: 1px solid rgba(165, 139, 202, .2);

        box-shadow:
            0 5px 15px rgba(100, 75, 130, .12);

        backdrop-filter: blur(8px);
    }

    .thinking-dots span {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #9475c2;

        animation: dot 1s ease-in-out infinite;
    }

    .thinking-dots span:nth-child(2) {
        animation-delay: .15s;
    }

    .thinking-dots span:nth-child(3) {
        animation-delay: .3s;
    }

    @keyframes float {
        0%,
        100% {
            transform: translateY(0);
        }

        50% {
            transform: translateY(-5px);
        }
    }

    @keyframes dot {
        0%,
        100% {
            transform: translateY(0);
            opacity: .4;
        }

        50% {
            transform: translateY(-3px);
            opacity: 1;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .cat,
        .thinking-dots span {
            animation: none;
        }
    }
</style>