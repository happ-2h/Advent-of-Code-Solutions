/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Quick linked list implementation
 */

#ifndef LINKEDLIST_H
#define LINKEDLIST_H

#include <stdlib.h>

typedef struct NODE_STRUCT {
  int data[2];              // Coordinates 0: x, 1: y
  struct NODE_STRUCT* next; // Pointer to next node
} node_t;

typedef struct LINKEDLIST_STRUCT {
  node_t* head; // Start of list

  // Insert a set of coordinates to the end of the list
  void (*append)(struct LINKEDLIST_STRUCT*, int[2]);
} LinkedList_t;

LinkedList_t* LinkedList_new();
void LinkedList_destroy(LinkedList_t*);

/**
 * Appends a new node_t to the end of the list
 *
 * @param list - List to append to
 * @param data - Data to append
*/
static void LinkedList_append(LinkedList_t* list, int data[2]);

#endif // LINKEDLIST_H