class Node {
    constructor(data) {
        this.data = data;
        this.next = null
    }
}

class LinkList {
    constructor(head = null) {
        this.head = head;
    }

    clear() {
        this.head = null;
    }

    getFirst() {
        return this.head;
    }

    getLast() {
        let lastNode = this.head;
        if (lastNode) {
            while (lastNode.next) {
                lastNode = lastNode.next
            }
        }
        return lastNode
    }

    size() {
        let count = 0;
        let node = this.head;
        while (node) {
            count++;
            node = node.next
        }
        return count;
    }

    printAllData(head) {
        let result = '';
        let last = head;
        while(last !== null) {
            result = result + " " + last.data;
            last = last.next;
        }
        return result;

       
    }

    //Insert Operation START
    insertAtFront(head, newNode) {
       
        // Make the next of the new node point to the current
        // head
        newNode.next = head;

        // Return the new node as the new head of the list
        return newNode;
    }

    insertAtLast(head, newNode) {

        if (head == null) return newNode;

        // find last node
        let last = head;

        while(last.next !== null)
            last = last.next;

        last.next = newNode;

        return head;

    }

    insertAtPosition() {}
    //Insert Operation END

    //Delete Operation START
    //Delete Operation END

    //Search Operation START
    //Search Operation END 
}

let head = new Node(2);
let node2 = new Node(3);
let node3 = new Node(4);
let node4 = new Node(5);

let node5 = new Node(1);

let node6 = new Node(6);

head.next = node2;
node2.next = node3;
node3.next = node4;

let list = new LinkList(head);
//let first = list.getFirst();
//let last = list.getLast();
let size = list.size();
head = list.insertAtFront(head, node5);
head = list.insertAtLast(head, node6);

let result = list.printAllData(head);

console.log("nodes :: ", result);