(function($, undefined) {
    $.fn.sidebar_menu = function(options) {
      let nodes_to_hide, nodes_with_title, nodes_of_level1;

      nodes_to_hide = $(this).find("[sidebar_type='subItems']");
      for (var nNodeIndex = 0; nNodeIndex < nodes_to_hide.length; nNodeIndex++) {
        let currentNode;
        currentNode = nodes_to_hide[nNodeIndex];
        //currentNode.css('display','none');
        $(currentNode).css('display','none');

      }


      nodes_with_title = $(this).find("[sidebar_type='item_title']");
      for (var nNodeIndex = 0; nNodeIndex < nodes_with_title.length; nNodeIndex++) {
        let currentNode, nodeSibling;
        currentNode = nodes_with_title[nNodeIndex];
        nodeSibling = $(currentNode).next();

        if ($(nodeSibling).attr('sidebar_type')) {
          if ($(nodeSibling).attr('sidebar_type').toLowerCase() == 'subitems') {
              $(currentNode).click(function () {
                  $(nodeSibling).slideToggle();
              });
          }
        }

      }

      nodes_of_level1 = $(this).children();
      for (var nNodeIndex = 0; nNodeIndex < nodes_of_level1.length; nNodeIndex++) {
        let currentNode;
        currentNode = nodes_of_level1[nNodeIndex];
        $(currentNode).attr('node_level','1') ;
      }


      /*
      $(this).find("[sidebar_type='subItems']").forEach((htmlNode) => {
        console.log(htmlNode);
      });
      */

    }
})(jQuery);

function sidebar_show_byId(id) {
  let currentNode, parentNode, nodeLevel, nMaxIterations, nIterations;
  nMaxIterations = 10;
  nIterations = 0;
  id = '#' + id;
  currentNode = $(id);
  $(currentNode).addClass('sidebar_active_item');
  parentNode = $(currentNode).parent();
  nodeLevel = $(currentNode).attr('node_level');
  if (!nodeLevel) {
    nodeLevel = 99;
  }
  while (nodeLevel != 1 && nIterations < nMaxIterations) {
    let nodeSibling;
    currentNode = parentNode;

    parentNode = $(currentNode).parent();
    nodeLevel = $(currentNode).attr('node_level');


    if ($(currentNode).attr('sidebar_type') == 'subItems') {
      nodeSibling = currentNode.prev()[0];
      if ($(nodeSibling).attr('sidebar_type') == 'item_title') {
        $(nodeSibling).addClass('sidebar_active_item_parent');
      }
      $(currentNode).show();
    }
    nIterations += 1;
  }

}
