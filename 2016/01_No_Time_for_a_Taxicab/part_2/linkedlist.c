/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Quick linked list implementation
 */

#include "linkedlist.h"

LinkedList_t* LinkedList_new() {
  LinkedList_t* tmp = (LinkedList_t*)malloc(sizeof(LinkedList_t));
  tmp->head = NULL;
  tmp->append = LinkedList_append;

  return tmp;
}
void LinkedList_destroy(LinkedList_t* list) {
  if (list) {
    if (list->head) {
      node_t* tmp = NULL;

      // Free the linked list
      while(list->head != NULL) {
        tmp = list->head->next;
        free(list->head);
        list->head = tmp;
      }

      list->head = NULL;
    }
    free(list);
    list = NULL;
  }
}

void LinkedList_append(LinkedList_t* list, int data[2]) {
  if (list->head) {
    node_t* tmp = list->head;

    while(tmp->next != NULL) tmp = tmp->next;

    // MAYBE node_t constructor
    tmp->next = malloc(sizeof(node_t));
    tmp->next->data[0] = data[0];
    tmp->next->data[1] = data[1];
    tmp->next->next = NULL;
  }
  else {
    // MAYBE node_t constructor
    list->head = malloc(sizeof(node_t));
    list->head->data[0] = data[0];
    list->head->data[1] = data[1];
    list->head->next = NULL;
  }
}