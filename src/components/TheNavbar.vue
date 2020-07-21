<template>
    <header id="navbar">
        <button @click="$router.push('/')" class="btn" id="homeBtn">
        <i class="fa fa-home fa-fw"></i></button>
        <button @click="$router.push('/trigger')" class="btn" id="triggerBtn">
        <i class="fa fa-search fa-fw"></i></button>
        <button @click="$router.push('/statistic')" class="btn" id="chartBtn">
        <i class="fa fa-pie-chart fa-fw"></i></button>
        <button @click="$router.push('/help')" class="btn" id="helpBtn">
        <i class="fa fa-question fa-fw"></i></button>
        <button @click="$router.push('/account')" class="btn" id="userBtn">
        <i class="fa fa-user fa-fw"></i></button>
    </header>
</template>

<style lang="css">
    #navbar {
        height: 15vh;
        width: 100vw;
        bottom: 0;
        left: 0;
        position: fixed;
        background-color: rgb(233, 233, 233);
        color: whitesmoke;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 0.5vmin solid rgb(216, 216, 216);
    }

    .btn {
        margin: 4vw;
        padding: 4vw;
        background: transparent;
        border: hidden;
        justify-content: center;
        align-items: center;
        outline: none;
        font-size: 3vw;
    }

    .btn:hover {
        transition-duration: 0.3s;
        filter: opacity(50%);
        -webkit-filter: opacity(50%);
    }
</style>
