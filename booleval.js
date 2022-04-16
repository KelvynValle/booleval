/*
    evaluates a boolean expression
    creates decision tree and evaluate the content
*/
function eval(expression) {

}

/*
    create a tree with the data to compare
    the nodes are connected with the logical operators
*/

var bool_operators = [">", "<", "==", ">=", "<=", "and", "or", "&&", "||"];

function createTree(expression) {
    let first = true;
    let tree = { operator: "start", node1: undefined };
    let operator;
    for (var i = 0; i < expression.length; i++) {
        while (expression[i] == " ") {
            i++;
        }
        if (expression[i] == '(') {
            let end = lastParentesis(expression, i);
            let node = createTree(selectParenthesis(expression, i, end));
            i = end++;
            if (first) {
                first = false;
                tree.node1 = node;
            } else {
                tree = { node1: tree, node2: node, operator: operator };
            }
        } else {
            let next_space = expression.indexOf(" ", i);
            next_space = next_space == -1 ? expression.length : next_space;
            let node = expression.substring(i, next_space);
            i = next_space;
            if (first) {
                first = false;
                tree.node1 = node;
            } else {
                if (bool_operators.includes(node)) {
                    operator = node;
                } else {
                    tree = { node1: tree, node2: node, operator: operator };
                }
            }
        }
    }
    return tree;
}


/*
    select the data between parenthesis
*/
//select the data between two parenthesis
function selectParenthesis(expression, start, end) {

}
//finds the last parenthesis as we give the start one
function lastParentesis(expression, start) {

}