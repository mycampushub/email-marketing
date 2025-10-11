import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Trash2, Edit, Mail, Tag, Download, Archive,
  MoreHorizontal, Users, Copy
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BulkActionsProps {
  selectedItems: any[];
  totalItems: number;
  onSelectAll: (checked: boolean) => void;
  onDelete: (items: any[]) => void;
  onEdit?: (items: any[]) => void;
  onTag?: (items: any[]) => void;
  onExport?: (items: any[]) => void;
  onArchive?: (items: any[]) => void;
  onSendEmail?: (items: any[]) => void;
  onDuplicate?: (items: any[]) => void;
  customActions?: Array<{
    label: string;
    icon: React.ComponentType<any>;
    action: (items: any[]) => void;
    variant?: 'default' | 'destructive' | 'outline';
  }>;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedItems,
  totalItems,
  onSelectAll,
  onDelete,
  onEdit,
  onTag,
  onExport,
  onArchive,
  onSendEmail,
  onDuplicate,
  customActions = []
}) => {
  const hasSelection = selectedItems.length > 0;
  const isAllSelected = selectedItems.length === totalItems;

  return (
    <div className="flex items-center justify-between p-4 border-b bg-muted/30">
      <div className="flex items-center space-x-4">
        <Checkbox
          checked={isAllSelected}
          onCheckedChange={onSelectAll}
          data-voice-context={`${isAllSelected ? 'Deselect' : 'Select'} all ${totalItems} items`}
        />
        <span className="text-sm text-muted-foreground">
          {hasSelection ? (
            <>
              <Badge variant="secondary" className="mr-2">
                {selectedItems.length}
              </Badge>
              selected
            </>
          ) : (
            `${totalItems} items`
          )}
        </span>
      </div>

      {hasSelection && (
        <div className="flex items-center space-x-2">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(selectedItems)}
              data-voice-context={`Edit ${selectedItems.length} selected items`}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}

          {onTag && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTag(selectedItems)}
              data-voice-context={`Add tags to ${selectedItems.length} selected items`}
            >
              <Tag className="h-4 w-4 mr-1" />
              Tag
            </Button>
          )}

          {onSendEmail && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSendEmail(selectedItems)}
              data-voice-context={`Send email to ${selectedItems.length} selected contacts`}
            >
              <Mail className="h-4 w-4 mr-1" />
              Email
            </Button>
          )}

          {onDuplicate && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDuplicate(selectedItems)}
              data-voice-context={`Duplicate ${selectedItems.length} selected items`}
            >
              <Copy className="h-4 w-4 mr-1" />
              Duplicate
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onExport && (
                <DropdownMenuItem onClick={() => onExport(selectedItems)}>
                  <Download className="h-4 w-4 mr-2" />
                  Export ({selectedItems.length})
                </DropdownMenuItem>
              )}
              
              {onArchive && (
                <DropdownMenuItem onClick={() => onArchive(selectedItems)}>
                  <Archive className="h-4 w-4 mr-2" />
                  Archive ({selectedItems.length})
                </DropdownMenuItem>
              )}

              {customActions.map((action, index) => (
                <DropdownMenuItem 
                  key={index}
                  onClick={() => action.action(selectedItems)}
                >
                  <action.icon className="h-4 w-4 mr-2" />
                  {action.label} ({selectedItems.length})
                </DropdownMenuItem>
              ))}

              {(onExport || onArchive || customActions.length > 0) && (
                <DropdownMenuSeparator />
              )}

              <DropdownMenuItem 
                onClick={() => onDelete(selectedItems)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete ({selectedItems.length})
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};