<template>
  <vue-countdown :time="2 * 24 * 60 * 60 * 1000" :transform="transformSlotProps" v-slot="{ days, hours, minutes, seconds }">
    Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.
  </vue-countdown>
</template>

<script>
export default {
    name : 'Countdown',
    methods: {
        transformSlotProps(props) {
        const formattedProps = {};

        Object.entries(props).forEach(([key, value]) => {
            formattedProps[key] = value < 10 ? `0${value}` : String(value);
        });

        return formattedProps;
        },
    },
};
</script>