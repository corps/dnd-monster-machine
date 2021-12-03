import React, {PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useInput} from "ink";
import {arrayCmp, Indexer, Keyer} from "./indexes";

type FocusNode = { id: number, order: number[], parents: number[], isActive: boolean };
type FocusPK = [number];
type FocusPath = [[...(number | null)[]], number?];
type Tree = [Indexer<FocusPK, FocusNode>, Indexer<FocusPath, FocusNode>]
const pkKeyer: Keyer<FocusPK, FocusNode> = (({id}: FocusNode) => [id]);
const pathKeyer: Keyer<FocusPath, FocusNode> = (({id, order}: FocusNode) => [order, id]);

const BetterFocusContext = React.createContext({
  nextId() {
    return Math.random();
  },
  tree: [new Indexer<FocusPK, FocusNode>(pkKeyer), new Indexer<FocusPath, FocusNode>(pathKeyer)] as Tree,
  setTree(t: (v: Tree) => Tree) {
  	t;
  },
  focus: 0,
  setFocus: (v: number) => {
  	v;
  },
})

function deleteFromTree(tree: Tree, id: number): Tree {
  const [pk, path] = tree;
  return [pk.removeByPk(pk, [id]), path.removeByPk(pk, [id])];
}

function getNode(tree: Tree, id: number | null): FocusNode | null {
  const [pk] = tree;

  if (id) {
    let node = pk.getFirstMatching([id]);
    if (!node) return null;
    return node;
  }

  return null;
}

function addToTree(tree: Tree, id: number, parent: number | null, nodeOrder: number, isActive: boolean): Tree {
  const [pk, path] = tree;
  let ancestory: number[] = [];
  let order: number[] = [];

  const parentNode = getNode(tree, parent);

  if (parentNode && parent) {
    ancestory.push(...parentNode.parents, parent);
    order.push(...parentNode.order);
  }

  order.push(nodeOrder)

  const node: FocusNode = {id, parents: ancestory, order, isActive};

  return [pk.update([node], pk), path.update([node], pk)]
}

export function useFocus2({
  isActive = true,
  parentId = null,
  order
}: { isActive?: boolean, parentId?: number | null, order: number }) {
  const {nextId, focus, tree, setTree} = useContext(BetterFocusContext);
  const parent = getNode(tree, parentId);

  const id = useMemo(() => nextId(), []);
  const focusReady = !!getNode(tree, id);

  useEffect(() => {
    return () => {
      setTree(tree => deleteFromTree(tree, id))
    }
  }, []);

  useEffect(() => {
    if (!!parent === !!parentId) setTree(tree => addToTree(tree, id, parentId, order, isActive));
  }, [!!parent === !!parentId, order, isActive])

  const isFocused = isActive && focus === id;
  const focusId = id;
  const childIsFocused = isChildOf(tree, id, focus);

  return {isFocused, focusId, childIsFocused, focusReady};
}

function isChildOf(tree: Tree, parent: number, focus: number): boolean {
  if (focus === parent) return true;
  const [pk] = tree;
  let parentNode = pk.getFirstMatching([parent]);
  let focusNode = pk.getFirstMatching([focus]);

  if (parentNode && focusNode) {
    return arrayCmp(
      parentNode.parents.concat([parentNode.id]),
      focusNode.parents.slice(0, parentNode.parents.length + 1),
    ) === 0;
  }

  return false;
}

export function useFocusManager2() {
  const {focus, tree, setFocus} = useContext(BetterFocusContext);

  const focusNext = useCallback(() => {
    setFocus(nextFrom(focus, tree) || -1);
  }, [focus, tree, setFocus])

  const focusPrevious = useCallback(() => {
    setFocus(prevFrom(focus, tree) || -1);
  }, [focus, tree, setFocus])

  const nothingFocused = focus === -1;

  return {setFocus, focusNext, focusPrevious, nothingFocused};
}

function nextFrom(id: number | null, tree: Tree): number | null {
  let [_, path] = tree;
  let node = getNode(tree, id);
  const p = node ? path.keyer(node)[0] : [];
  node = Indexer.iterator(path.index, [[...p, null]])();

  while (node) {
    const p = path.keyer(node)[0];
    const startKey = [[...p, null]];
    const endKey = [[...p, Infinity], Infinity];
    const next = Indexer.iterator(path.index, startKey, endKey)();

    if (next) {
      node = next;
    } else {
      if (!node.isActive) {
        const p = node ? path.keyer(node)[0] : [];
        node = Indexer.iterator(path.index, [[...p, null]])();
        continue;
      }

      return node.id;
    }
  }

  return null;
}

function prevFrom(id: number | null, tree: Tree): number | null {
  let [_, path] = tree;
  let node = getNode(tree, id);
  const p = node ? path.keyer(node)[0] : [];
  node = Indexer.reverseIter(path.index, [p])();

  while (node) {
    const p = path.keyer(node)[0];
    const startKey = [[...p, null]];
    const endKey = [[...p, Infinity]];
    const next = Indexer.iterator(path.index, startKey, endKey)();
    if (next) {
      node = Indexer.reverseIter(path.index, [p])();
    } else {
      if (!node.isActive) {
        const p = node ? path.keyer(node)[0] : [];
        node = Indexer.reverseIter(path.index, [p])();
        continue;
      }
      return node.id;
    }
  }

  return null;
}

let lastId = 1;
export function BetterFocus({children}: PropsWithChildren<{}>) {
  const [tree, setTree] = useState([new Indexer<FocusPK, FocusNode>(pkKeyer), new Indexer<FocusPath, FocusNode>(pathKeyer)] as Tree);
  const [focus, setFocus] = useState(-1);

  const value = {
    nextId() {
      return lastId++;
    }, tree, setTree, focus, setFocus,
  };

  useInput((_, key) => {
    if (key.tab) {
      if (key.shift) {
        setFocus(prevFrom(focus, tree) || -1);
        return;
      }

      const nextFocus = nextFrom(focus, tree) || -1;
      setFocus(nextFocus);
    }
  })

  useEffect(() => {
    if (focus === -1 || getNode(tree, focus)?.isActive) return;
    setFocus(nextFrom(focus, tree) || -1);
  }, [tree, focus])

  return <BetterFocusContext.Provider value={value}>
    {children}
  </BetterFocusContext.Provider>
}
