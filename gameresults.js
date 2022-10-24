export default results = {
    rock: {
        paper: {
            msg: 'paper covers rock',
            result: 0
        },
        scissors: {
            msg: 'rock crushes scissors',
            result: 1
        },
        lizard: {
            msg: '',
            result: null,
        },
        spock: {
            msg: '',
            result: null,
        },
    },
    paper: {
        rock: {
            msg: 'paper covers rock',
            result: 1
        },
        scissors: {
            msg: 'scissors cuts paper',
            result: 0
        },
        spock: {
            msg: 'paper disproves spock',
            result: 1
        },
        lizard: {
            msg: 'lizard eats paper',
            result: 0
        }
    },
    lizard: {
        spock: {

        },
        scissors: {

        },
        rock: {

        },
        paper: {
            msg: 'lizard eats paper',
            result: 1
        }
    },
    scissors: {
        rock: {
            msg: 'rock crushes scissors',
            result: 0
        },
        paper: {
            msg: 'scissors cuts paper',
            result: 1
        },
        lizard: {
            msg: '',
            result: null
        },
        spock: {
            msg: '',
            result: null
        }
    },
    spock: {
        paper: {
            msg: 'paper disproves spock',
            result: 0
        }
    }
}