function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let leftBrace = 0;
    let rightBrace = 0;

    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '(') {
            leftBrace++
        } else if (expr[i] === ')')
            rightBrace++
    }
    if (leftBrace != rightBrace) {
        throw 'ExpressionError: Brackets must be paired'
    }
    let tokens = expr.replace(/\s/gm, '').replace(/\)/gm, ' )').replace(/\(/gm, '( ').replace(/\+/gm, ' + ').replace(/\-/gm, ' - ').replace(/\*/gm, ' * ').replace(/\//gm, ' / ').split(' ');

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] != "-" && tokens[i] != "+" && tokens[i] != "*" && tokens[i] != "/" && tokens[i] != "(" && tokens[i] != ")") {
            let temp = 0;
            temp += +tokens[i];
            tokens.splice(i, 1, temp);
        }
    }

    let precedence = function (op) {
        if (op == '+' || op == '-') {
            return 1
        }
        if (op == '*' || op == '/') {
            return 2
        } else return 0;

    }
    let applyOp = function (a, b, op) {
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b == 0) {
                    throw "TypeError: Division by zero."
                } else return a / b;
        }
    }
    let values = [];
    let ops = [];

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] == '(') {
            ops.push(tokens[i]);
        }
        if (Number.isInteger(tokens[i])) {
            values.push(tokens[i]);
        }
        if (tokens[i] == ')') {
            while (ops.length != 0 && ops[ops.length - 1] != '(') {

                let val2 = values[values.length - 1];
                values.pop();

                let val1 = values[values.length - 1];
                values.pop();

                let op = ops[ops.length - 1];
                ops.pop();

                values.push(applyOp(val1, val2, op));
            }
            if (ops.length != 0)
                ops.pop();
        }
        if (tokens[i] == '+' || tokens[i] == '-' || tokens[i] == '*' || tokens[i] == '/') {

            while (ops.length != 0 && precedence(ops[ops.length - 1]) >= precedence(tokens[i])) {

                let val2 = values[values.length - 1];
                values.pop();

                let val1 = values[values.length - 1];
                values.pop();

                let op = ops[ops.length - 1];
                ops.pop();

                values.push(applyOp(val1, val2, op));
            }
            ops.push(tokens[i]);
        }

    }
    while (ops.length != 0) {
        let val2 = values[values.length - 1];
        values.pop();

        let val1 = values[values.length - 1];
        values.pop();

        let op = ops[ops.length - 1];
        ops.pop();

        values.push(applyOp(val1, val2, op));
    }
    return values[0];
}

module.exports = {
    expressionCalculator
}