export enum Type {
  Number = 'number',
  Boolean = 'boolean',
  String = 'string',
  Array = 'array',
  Any = 'any',
  Error = 'error'
}

/**
 * We don't care for the value as we are only checking the scope, type, and name of all variables
 */
export class ScopedSymbolTable {
  // first scope in stack is global scope
  private scopeList: Array<Map<string, Type>> = [new Map()]


  public pushScope() {
    this.scopeList.push(new Map())
  }

  public popScope() {
    if (this.scopeList.length === 1) {
      throw new Error('Attempted to pop global stack')
    }
    this.scopeList.pop()
  }

  public lookupSymbol(varName: string): Type | undefined {
    for (let i = this.scopeList.length-1; i >= 0; i--) {
      const scope = this.scopeList[i]
      if (scope.has(varName)) {
        return scope.get(varName) 
      }
    }
    return undefined
  }

  public declareSymbol(varName: string, type: Type) {
    const [scope, index] = this.getCurrentScope()
    scope.set(varName, type)
  }

  public updateSymbol(varName: string, type: Type): boolean {
    for (let i = this.scopeList.length-1; i >= 0; i--) {
      const scope = this.scopeList[i]
      if (scope.has(varName)) {
        scope.set(varName, type)
        return true 
      }
    }
    return false
  }

  public getCurrentScope(): [Map<string, Type>, number] {
    const index = this.scopeList.length-1
    return [this.scopeList[index], index]
  }

  public getGlobalScope() {
    return this.scopeList[0]
  }
}