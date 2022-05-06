/*
    evaluates a boolean expression
*/
function boolEval(expression, inversion = false) {
    if (expression.includes("||") || expression.includes("&&")) {
        for (let i = 0; i < expression.length; i++) {
            while (expression[i] == " ") {
                i++;
            }
            if (expression[i] == "(") {
                let end_parenthesis = lastParentesis(expression, i);
                if (end_parenthesis == expression.length - 1) {
                    return inversion ? !boolEval(expression.slice(i + 1, end_parenthesis)) : !boolEval(expression.slice(i + 1, end_parenthesis));
                } else {
                    let left = expression.slice(i + 1, end_parenthesis);
                    i = end_parenthesis + 1;
                    while (expression[i] == " ") {
                        i++;
                    }
                    let next_space = expression.indexOf(" ", i);
                    next_space == -1 ? expression.length : next_space;
                    switch (expression.substring(i, next_space)) {
                        case "||":
                            return (inversion ? !boolEval(left) : boolEval(left)) || boolEval(expression.slice(next_space + 1));
                        case "&&":
                            return (inversion ? !boolEval(left) : boolEval(left)) && boolEval(expression.slice(next_space + 1));
                        default:
                            console.log("Error.")
                            break;
                    }
                }
            } else if (expression[i] == "!") {
                return boolEval(expression.slice(i + 1, expression.length), true);
            } else {
                let next_space = expression.indexOf(" ", i);
                next_space == -1 ? expression.length : next_space;
                switch (expression.substring(i, next_space)) {
                    case "||":
                        return boolEval(expression.substring(0, i - 1)) || boolEval(expression.substring(next_space + 1, expression.length));
                    case "&&":
                        return boolEval(expression.substring(0, i - 1)) && boolEval(expression.substring(next_space + 1, expression.length));
                    default:
                        i = next_space;
                        break;
                }
            }
        }
    } else {
        if (expression[0] == "(") {
            let end_parenthesis = lastParentesis(expression, 0);
            return inversion ? !boolEval(expression.slice(1, end_parenthesis)) : boolEval(expression.slice(1, end_parenthesis));
        } else if (expression[0] == "!") {
            return inversion ? !boolEval(expression.slice(1, expression.length), true) : boolEval(expression.slice(1, expression.length), true);
        } else {
            let branch = expression.split(" ");
            if (!isNaN(branch[0]) && !isNaN(branch[2])) {
                return inversion ? !nodeEval(parseFloat(branch[0]), parseFloat(branch[2]), branch[1]) : nodeEval(parseFloat(branch[0]), parseFloat(branch[2]), branch[1]);
            }
        }
    }
}

/*
    node eval
    interprets the relation between two nodes
*/
function nodeEval(node1, node2, operator) {
    switch (operator) {
        case "==":
            return node1 == node2;
        case "!=":
            return node1 != node2;
        case ">":
            return node1 > node2;
        case "<":
            return node1 < node2;
        case ">=":
            return node1 >= node2;
        case "<=":
            return node1 <= node2;
        case "and":
        case "&&":
            return node1 && node2;
        case "or":
        case "||":
            return node1 || node2;
    }
}

/*
    finds the last parenthesis as we give the start one
*/
function lastParentesis(expression, start) {
    let parenthesis_count = 0;
    for (let i = start; i < expression.length; i++) {
        if (expression[i] == "(") {
            parenthesis_count++;
        } else if (expression[i] == ")") {
            parenthesis_count--;
        }
        if (parenthesis_count == 0) {
            return i;
        }
    }
    return -1;
}