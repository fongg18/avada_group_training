import React from "react";
import {
  ResourceList,
  ResourceItem,
  LegacyStack,
  Badge,
  Button,
  Text
} from "@shopify/polaris";

const TodoList = ({
  todos,
  selectedItems,
  setSelectedItems,
  bulkActions,
  onComplete,
  onDelete,
  loading,
}) => (
  <ResourceList
    resourceName={{ singular: "todo", plural: "todoes" }}
    items={todos}
    selectedItems={selectedItems}
    onSelectionChange={setSelectedItems}
    bulkActions={bulkActions}
    renderItem={(item) => {
      const { id, text, isCompleted } = item;
      return (
        <ResourceItem id={id}>
          <LegacyStack alignment="center">
            <Text variant="bodyMd" as="span">{text}</Text>
            <Badge status={isCompleted ? "success" : "warning"}>
              {isCompleted ? "Complete" : "Incomplete"}
            </Badge>
            <Button
              onClick={() => onComplete([id])}
              size="slim"
              disabled={isCompleted}
            >
              Complete
            </Button>
            <Button
              onClick={() => onDelete([id])}
              destructive
              size="slim"
            >
              Delete
            </Button>
          </LegacyStack>
        </ResourceItem>
      );
    }}
  />
);

export default TodoList;
